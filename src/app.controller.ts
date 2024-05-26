import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AppService } from './app.service';
import { FilterDTO } from './dto/filter.dto';
import { DemoData } from './dto/load-data.dto';
import { DemoEntity } from './entity/demo-data.entity';

@Controller('rooms')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRooms(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 5,
    @Query() filter: FilterDTO,
  ): Promise<Pagination<DemoEntity>> {
    console.log(filter);
    
    return this.appService.getRooms({
      page,
      limit,
    }, filter);
  }

  @Post('demo')
  create(@Body() body: DemoData) {
    try {
      return this.appService.createDemoData(body)
    } catch (error) {
      return {
        message: 'Something went wrong',
        details: error.message
      }
    }
  }
}
