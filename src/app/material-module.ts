import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
//import { MatInputModule } from '@angular/material/input';

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
//        MatInputModule
    ]})

export class MaterialModule {}