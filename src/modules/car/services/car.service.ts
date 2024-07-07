import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { LoggerService } from '../../logger/logger.service';
import { CarRepository } from '../../repository/services/car.repository';
import { LikeRepository } from '../../repository/services/like.repository';
import { StatisticRepository } from '../../repository/services/statistic.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ArticleListReqDto } from '../dto/req/article-list.req.dto';
import { CreateArticleReqDto } from '../dto/req/create-article.req.dto';
import { UpdateArticleReqDto } from '../dto/req/update-article.req.dto';
import { ArticleResDto } from '../dto/res/article.res.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';
import { CarMapper } from './car.mapper';
import { CarListReqDto } from '../dto/req/car-list.req.dto';

@Injectable()
export class CarService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly likeRepository: LikeRepository,
    private readonly carRepository: CarRepository,
    private readonly statisticRepository: StatisticRepository,
  ) {}

  public async getList(
    userData: IUserData,
    query: CarListReqDto,
  ): Promise<CarListResDto> {
    const [entities, total] = await this.carRepository.getList(
      userData,
      query,
    );
    return ArticleMapper.toListResponseDTO(entities, total, query);
  }

  public async create(
    userData: IUserData,
    dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    const tags = await this.createTags(dto.tags);
    const article = await this.carRepository.save(
      this.carRepository.create({
        ...dto,
        user_id: userData.userId,
        tags,
      }),
    );
    return ArticleMapper.toResponseDTO(article);
  }

  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || tags.length === 0) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = new Set(entities.map((tag) => tag.name));
    const newTags = tags.filter((tag) => !existingTags.has(tag));

    const newEntities = await this.tagRepository.save(
      newTags.map((name) => this.tagRepository.create({ name })),
    );
    return [...entities, ...newEntities];
  }

  public async getById(
    userData: IUserData,
    articleId: string,
  ): Promise<ArticleResDto> {
    const article = await this.articleRepository.findArticleById(
      userData,
      articleId,
    );
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return ArticleMapper.toResponseDTO(article);
  }

  public async updateById(
    userData: IUserData,
    articleId: string,
    dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    const article = await this.findMyArticleByIdOrThrow(
      userData.userId,
      articleId,
    );
    await this.articleRepository.save({ ...article, ...dto });
    const updatedArticle = await this.articleRepository.findArticleById(
      userData,
      articleId,
    );
    return ArticleMapper.toResponseDTO(updatedArticle);
  }

  public async deleteById(
    userData: IUserData,
    articleId: string,
  ): Promise<void> {
    const article = await this.findMyArticleByIdOrThrow(
      userData.userId,
      articleId,
    );
    await this.articleRepository.remove(article);
  }

  public async findMyArticleByIdOrThrow(
    userId: string,
    articleId: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({
      id: articleId,
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    if (article.user_id !== userId) {
      throw new ForbiddenException();
    }
    return article;
  }

  public async like(userData: IUserData, articleId: string): Promise<void> {
    await this.findArticleByIdOrThrow(articleId);
    const like = await this.likeRepository.findOneBy({
      article_id: articleId,
      user_id: userData.userId,
    });
    if (like) {
      throw new ConflictException('Already liked');
    }
    await this.likeRepository.save(
      this.likeRepository.create({
        article_id: articleId,
        user_id: userData.userId,
      }),
    );
  }

  public async unlike(userData: IUserData, articleId: string): Promise<void> {
    await this.findArticleByIdOrThrow(articleId);
    const like = await this.likeRepository.findOneBy({
      article_id: articleId,
      user_id: userData.userId,
    });
    if (!like) {
      throw new ConflictException('Not liked yet');
    }
    await this.likeRepository.remove(like);
  }

  private async findArticleByIdOrThrow(
    articleId: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }
}
