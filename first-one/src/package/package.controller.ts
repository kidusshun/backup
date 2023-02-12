import { Controller, Get, Param, Query } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
    constructor(private packageService:PackageService){}
    @Get()
    async getPackage(@Query('title') title:string){
        return this.packageService.getPackage(title);
    }
}
