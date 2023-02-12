import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PackageService {
    constructor(private prisma:PrismaService){}
    async getPackage(title){
        const pkg = await this.prisma.package.findUnique({where:{title}})
        return pkg
    }
}
