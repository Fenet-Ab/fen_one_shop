import { Injectable } from '@nestjs/common';
import { supabase } from '../config/superbase';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.material.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.material.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async uploadImage(file: Express.Multer.File) {
    const fileName = `${uuid()}-${file.originalname}`;

    const { error } = await supabase.storage
      .from('materials')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage
      .from('materials')
      .getPublicUrl(fileName);

    return data;
  }
  async createMaterial(file: Express.Multer.File, body: any) {
    const imageUrl = await this.uploadImage(file);

    return this.prisma.material.create({
      data: {
        title: body.title,
        description: body.description,
        categoryId: body.categoryId,
        price: parseFloat(body.price || '0'),
        imageUrl: imageUrl.publicUrl,
      },
    });
  }
  async updateMaterial(id: string, file: Express.Multer.File, body: any) {
    let updateData: any = {
      title: body.title,
      description: body.description,
      categoryId: body.categoryId,
      price: parseFloat(body.price || '0'),
    };

    if (file) {
      const imageUrl = await this.uploadImage(file);
      updateData.imageUrl = imageUrl.publicUrl;
    }

    return this.prisma.material.update({
      where: { id },
      data: updateData,
    });
  }
  async deleteMaterial(id: string) {
    const material = await this.prisma.material.findUnique({
      where: { id },
    });

    if (!material) throw new Error('Material not found');

    // Extract file name from URL
    const fileName = material.imageUrl.split('/').pop();

    await supabase.storage.from('materials').remove([fileName!]);

    await this.prisma.material.delete({
      where: { id },
    });

    return { message: 'Material deleted successfully' };
  }




}
