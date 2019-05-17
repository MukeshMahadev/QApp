import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { SearchBoxComponent } from './search-box/search-box.component';




@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        NoopAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,        
    ],    
    declarations: [AppComponent, SearchBoxComponent],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
