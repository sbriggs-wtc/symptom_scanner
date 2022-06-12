import { Injectable } from '@nestjs/common';
import { InputTextDto } from './dto/InputText.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import * as cheerio from 'cheerio';
import * as natural from 'natural';
//import * as lemmatize from 'wink-lemmatizer';

@Injectable()
export class SymptomsService {
  constructor(private httpService: HttpService) {}

  spanWrap(str) {
    return "<span class='hl'>" + str + '</span>';
  }

  arrayUnique(matches) {
    const uniqueMatches = [];
    matches.forEach((m) => {
      if (!uniqueMatches.includes(m)) {
        uniqueMatches.push(m);
      }
    });
    return uniqueMatches;
  }

  async scrapeSymptoms(): Promise<string[]> {
    const url = 'http://www.nhsinform.scot/symptoms-and-self-help/a-to-z/';
    const observable = this.httpService.get(url).pipe(map((res) => res.data));
    const data = await lastValueFrom(observable);
    const $ = cheerio.load(data);
    const symptoms = $('.nhs-uk__az-link')
      .map(function () {
        return $(this).text().trim().toLowerCase();
      })
      .get();
    return symptoms;
  }

  async matchSymptoms(inputText: string): Promise<string[]> {
    const text = inputText.toLowerCase();
    const matches = [];
    const symptoms = await this.scrapeSymptoms();
    symptoms.forEach((s) => {
      const stemmed = natural.LancasterStemmer.stem(s);
      const pos1 = text.search(new RegExp(s, 'gi'));
      const pos2 = text.search(stemmed);
      if (pos1 != -1) {
        matches.push(text.substring(pos1, pos1 + s.length));
      }
      if (pos2 != -1) {
        matches.push(text.substring(pos2, pos2 + stemmed.length));
      }
    });
    return this.arrayUnique(matches);
  }
}
