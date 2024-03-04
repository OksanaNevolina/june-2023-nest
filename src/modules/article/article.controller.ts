import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { ArticleListRequestDto } from './models/dto/request/article-list.request.dto';
import { CreateArticleRequestDto } from './models/dto/request/create-article.request.dto';
import { EditArticleRequestDto } from './models/dto/request/edit-article.request.dto';
import { ArticleResponseDto } from './models/dto/responce/article.response.dto';
import { ArticleService } from './services/article.service';

@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @SkipAuth()
  @Get()
  public async getList(
    @Query() query: ArticleListRequestDto,
  ): Promise<ArticleResponseDto> {
    return await this.articleService.getList(query);
  }

  @ApiBearerAuth()
  @Put()
  public async create(
    @Body() dto: CreateArticleRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResponseDto> {
    return await this.articleService.create(dto, userData);
  }
  @SkipAuth()
  @Get(':articleId')
  public async getArticleById(
    @Param('articleId', ParseUUIDPipe) articleId: string,
  ): Promise<ArticleResponseDto> {
    return await this.articleService.getArticleById(articleId);
  }

  @ApiBearerAuth()
  @Put(':articleId')
  public async editArticleById(
    @Param('articleId') articleId: string,
    @Body() dto: EditArticleRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResponseDto> {
    return await this.articleService.editArticleById(articleId, dto, userData);
  }

  @ApiBearerAuth()
  @Delete(':articleId')
  public async deleteArticleById(
    @Param('articleId') articleId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.articleService.deleteArticleById(articleId, userData);
  }
}
