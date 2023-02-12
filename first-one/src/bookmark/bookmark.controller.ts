import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService){}
    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto){
        return this.bookmarkService.createBookmark(userId, dto);
    }
    
    @Get()
    getbookmarks(@GetUser('id') userId: number){
        return this.bookmarkService.getbookmarks(userId);
    }

    @Get(':id')
    getBookmarkById(@GetUser() userId: number, @Param('id', ParseIntPipe) bookmarkId:number){
        return this.bookmarkService.getBookmarkById(userId, bookmarkId);
    }

    @Patch(':id')
    editBookmarkById(@GetUser('id') userId: number, @Body() dto: EditBookmarkDto, @Param('id', ParseIntPipe) bookmarkId: number){
        return this.bookmarkService.editBookmarkById(userId, dto, bookmarkId);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId: number, @Param('id',ParseIntPipe) bookmardId: number){
        return this.bookmarkService.deleteBookmarkById(userId, bookmardId)
    }
}
