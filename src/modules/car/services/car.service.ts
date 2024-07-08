import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { StatisticEntity } from '../../../database/entities/statistic.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { LoggerService } from '../../logger/logger.service';
import { CarRepository } from '../../repository/services/car.repository';
import { StatisticRepository } from '../../repository/services/statistic.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateCarReqDto } from '../dto/req/update-car.req.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';
import { CarMapper } from './car.mapper';
import { CarListReqDto } from '../dto/req/car-list.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CreateCarReqDto } from '../dto/req/create-car.req.dto';

@Injectable()
export class CarService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
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
    return CarMapper.toListResponseDTO(entities, total, query);
  }

  public async create(
    userData: IUserData,
    dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    const statistic = await this.createStatistic(dto.statistic);
    const car = await this.carRepository.save(
      this.carRepository.create({
        ...dto,
        user_id: userData.userId,
        statistic,
      }),
    );
    return CarMapper.toResponseDTO(car);
  }

  private async createStatistic(statistic: string): Promise<StatisticEntity> {
    if (!tags || tags.length === 0) return [];

    const entities = await this.Repository.findBy({ name: In(tags) });
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
