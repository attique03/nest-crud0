import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { AuthGuard } from 'src/utils/auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  // constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}
  constructor(
    @InjectRepository(Item)
    private itemModel: Repository<Item>,
  ) {}

  @UseGuards(AuthGuard)
  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  // async findOne(id: string): Promise<Item> {
  //   return await this.itemModel.findOne({ _id: id });
  // }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemModel.findOneBy({ id });

    if (!item) throw new NotFoundException('Item Not Found');
    return item;
  }

  // async create(item: Item): Promise<Item> {
  //   const newItem = new this.itemModel(item);
  //   return await newItem.save();
  // }

  async create(item: Item): Promise<Item> {
    const newItem = this.itemModel.create(item);
    return await this.itemModel.save(newItem);
  }

  // async delete(id: number): Promise<Item> {
  //   return await this.itemModel.findByIdAndRemove(id);
  // }

  async delete(id: number): Promise<Item> {
    const item = await this.itemModel.findOneBy({ id });
    if (!item) throw new NotFoundException('Item Not Found');
    return this.itemModel.remove(item);
  }

  // async update(id: number, item: Item): Promise<Item> {
  //   return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  // }

  async update(id: number, item: Item): Promise<Item> {
    let itemUpdate = await this.itemModel.findOneBy({ id });
    console.log('Inside Update ', itemUpdate, id);

    if (!itemUpdate) {
      throw new NotFoundException('Item Not Found');
    } else {
      itemUpdate = item;
      return await this.itemModel.save(itemUpdate);
    }
    // if (item) {
    //   itemUpdate = item;
    //   return await this.itemModel.save(itemUpdate);
    // } else {

    // }

    // return itemUpdate;
    // return await this.itemModel.update({ id }, item);
  }

  // async updateTaskStatus(id: number, updatedStatus: TaskStatus, user: User) {
  //   const task = await this.getTaskById(id, user);
  //   task.status = updatedStatus;
  //   return await this.taskRepository.save(task);
  // }
}
