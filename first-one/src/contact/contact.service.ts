import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageDto } from './dto';

@Injectable()
export class ContactService {
    constructor(private prisma:PrismaService){}
    async customerMessage(dto:MessageDto){
        const pkg = await this.prisma.message.upsert({
            where:{email: dto.email},
            create: {
                ...dto
            },
            update:{
                ...dto
            }
        })
    }
}
