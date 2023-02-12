import { Body, Controller, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { MessageDto } from './dto';

@Controller('contact')
export class ContactController {
    constructor(private contactService:ContactService){}
    @Put()
    async customerMessage(@Body() dto:MessageDto){
        return this.contactService.customerMessage(dto)
    }
}
