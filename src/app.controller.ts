import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { szabadsagIgenylesDto } from './szabadsagIgenyles.dto.js';
import { error } from 'console';
// import fs from 'node.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('szabadsagIgenyles')
  @Render('szabadsagIgenyles')
  getSzabadsagIgenyles() {
    return{

    }
  }

  @Post('szabadsagIgenyles')
  @Render('szabadsagIgenyles')
  szabadsagIgenyles(@Body() body: szabadsagIgenylesDto){
    const errors:string[] = []; 
    let success = false;

    if (!body.nev ) { //|| body.nev.trim() === 0
      errors.push("nevet kötelező megadni")
    }

    const kezdoDate = new Date(body.kezdoDate)
    if (!body.kezdoDate ) { 
      errors.push("Kezdő dátumot kötelező megadni!")
    }else{
      if (kezdoDate < new Date()){
        errors.push("A kezdő dátumnak a jövőben kell lennie mivel ez csak egy igénylés nem pedig igazolás")
      }
    }

    if (!body.vegDate){
      errors.push("Meg kell adni egy vég dátumot")
    }else{
      const vegDate = new Date(body.vegDate)
      if (kezdoDate > vegDate){
        errors.push("A szabadság kezdetének előbb kell lennie mint a végének")
      }
    }

    const re = /^[A-Z]{3}-[1-9]{3}$/
    if(!body.azonosito){
      errors.push("Alkalmazott zonosítót kötelező megadni!")
    }else if (!re.exec(body.azonosito)){
      errors.push('Az azonosítónak meg kell felelnie a következő formátumnak: "ABC-123" (A számok csak 1-9ig vannak benne)')

    }

    if(!body.indoklas){
      errors.push("Indoklást kötelező megadni!")
    }else{
      if (body.indoklas.trim().length < 30){
        errors.push("Az indoklásnak legalább 30 karakternek kell lennie!")
      }
    }

    if (errors.length > 0){
      return{
        body, errors
      };
    }

    // fs.createnewfilesync('')

    if (errors.length == 0){
      success = true
    }

    return body;


  }

}
