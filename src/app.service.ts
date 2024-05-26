import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterDTO } from './dto/filter.dto';
import { DemoData } from './dto/load-data.dto';
import { DemoEntity } from './entity/demo-data.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions
} from 'nestjs-typeorm-paginate'


@Injectable()
export class AppService {

  constructor(@InjectRepository(DemoEntity) private demoEntity: Repository<DemoEntity>) { }
  async createDemoData(demoData: DemoData) {
    const data = this.demoEntity.create(demoData)
    await this.demoEntity.save(data)

    return {
      message: 'Data Created',
      data
    }
  }

  async getRooms(option: IPaginationOptions, filterOption: FilterDTO): Promise<Pagination<DemoEntity>> {
    const { capacity, name, id, userId, field, order, sort } = filterOption

    const queryBuilder = this.demoEntity.createQueryBuilder('rooms')
 
   queryBuilder.orderBy(`rooms.${field}`, order as 'ASC' | 'DESC')
  
    capacity && queryBuilder.andWhere('rooms.capacity = :capacity', {capacity})

    name && queryBuilder.andWhere('rooms.name LIKE(:name)', {name: `%${name}%`})

    id && queryBuilder.andWhere('rooms.id = :id', {id})

    userId && queryBuilder.andWhere('rooms.userId = :userId', {userId}) 
    
    return paginate<DemoEntity>(queryBuilder, option)
  }


}
