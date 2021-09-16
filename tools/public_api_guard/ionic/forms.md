## API Report File for "ajf-srcs"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AfterViewInit } from '@angular/core';
import { AjfBaseFieldComponent } from '@ajf/core/forms';
import { AjfDateFieldInstance } from '@ajf/core/forms';
import { AjfDateValueStringPipe } from '@ajf/core/forms';
import { AjfEmptyFieldInstance } from '@ajf/core/forms';
import { AjfFieldComponentsMap } from '@ajf/core/forms';
import { AjfFieldService as AjfFieldService_2 } from '@ajf/core/forms';
import { AjfFieldWarningAlertResult } from '@ajf/core/forms';
import { AjfFieldWithChoicesComponent } from '@ajf/core/forms';
import { AjfFieldWithChoicesInstance } from '@ajf/core/forms';
import { AjfFormField as AjfFormField_2 } from '@ajf/core/forms';
import { AjfFormRenderer as AjfFormRenderer_2 } from '@ajf/core/forms';
import { AjfFormRendererService } from '@ajf/core/forms';
import { AjfFormulaFieldInstance } from '@ajf/core/forms';
import { AjfInputFieldComponent as AjfInputFieldComponent_2 } from '@ajf/core/forms';
import { AjfRange } from '@ajf/core/range';
import { AjfTableFieldComponent as AjfTableFieldComponent_2 } from '@ajf/core/forms';
import { AjfVideoUrlFieldComponent as AjfVideoUrlFieldComponent_2 } from '@ajf/core/forms';
import { AjfWarningAlertService as AjfWarningAlertService_2 } from '@ajf/core/forms';
import { AlertController } from '@ionic/angular';
import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import * as i0 from '@angular/core';
import * as i22 from '@ajf/ionic/barcode';
import * as i23 from '@ajf/ionic/calendar';
import * as i24 from '@ajf/ionic/checkbox-group';
import * as i25 from '@ajf/core/common';
import * as i26 from '@ajf/core/forms';
import * as i27 from '@ajf/ionic/page-slider';
import * as i28 from '@ajf/ionic/time';
import * as i29 from '@angular/common';
import * as i30 from '@angular/forms';
import * as i31 from '@gic/angular';
import * as i32 from '@ionic/angular';
import * as i33 from '@ajf/core/transloco';
import { IonInput } from '@ionic/angular';
import { ModuleWithProviders } from '@angular/core';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { PopoverController } from '@ionic/angular';

// @public (undocumented)
class AjfBarcodeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfBarcodeFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfBarcodeFieldComponent, never>;
}

// @public (undocumented)
export class AjfBooleanFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfBooleanFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfBooleanFieldComponent, never>;
}

// @public (undocumented)
export class AjfDateFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfDateFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDateFieldComponent, never>;
}

// @public (undocumented)
export class AjfDateInputFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, _dvs: AjfDateValueStringPipe);
    // (undocumented)
    input: IonInput;
    // (undocumented)
    onChange(event: Event): void;
    // (undocumented)
    protected _onInstanceChange(): void;
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfDateInputFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDateInputFieldComponent, never>;
}

// @public (undocumented)
export class AjfEmptyFieldComponent extends AjfBaseFieldComponent<AjfEmptyFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfEmptyFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfEmptyFieldComponent, never>;
}

// @public (undocumented)
export class AjfFieldService extends AjfFieldService_2 {
    constructor();
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFieldService, never>;
    // (undocumented)
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfFieldService>;
}

// @public (undocumented)
export class AjfFormField extends AjfFormField_2 {
    constructor(cdr: ChangeDetectorRef, cfr: ComponentFactoryResolver, fieldService: AjfFieldService);
    // (undocumented)
    readonly componentsMap: AjfFieldComponentsMap;
    // (undocumented)
    static ngAcceptInputType_readonly: BooleanInput;
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFormField, "ajf-field,ajf-form-field", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormField, never>;
}

// @public (undocumented)
class AjfFormPage {
    // (undocumented)
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfFormPage, "[ajfFormPage]", never, {}, {}, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormPage, never>;
}

// @public (undocumented)
export class AjfFormRenderer extends AjfFormRenderer_2 implements AfterViewInit, OnDestroy {
    constructor(rendererService: AjfFormRendererService, cdr: ChangeDetectorRef, popoverController: PopoverController);
    // (undocumented)
    get longSlide(): boolean;
    // (undocumented)
    static ngAcceptInputType_fixedOrientation: BooleanInput;
    // (undocumented)
    static ngAcceptInputType_hasEndMessage: BooleanInput;
    // (undocumented)
    static ngAcceptInputType_hasStartMessage: BooleanInput;
    // (undocumented)
    static ngAcceptInputType_hideBottomToolbar: BooleanInput;
    // (undocumented)
    static ngAcceptInputType_hideNavigationButtons: BooleanInput;
    // (undocumented)
    static ngAcceptInputType_hideTopToolbar: BooleanInput;
    // (undocumented)
    static ngAcceptInputType_readonly: BooleanInput;
    // (undocumented)
    static ngAcceptInputType_saveDisabled: BooleanInput;
    // (undocumented)
    ngAfterViewInit(): void;
    // (undocumented)
    ngOnDestroy(): void;
    // (undocumented)
    openPopover(ev: any, hint: string): void;
    // (undocumented)
    popoverController: PopoverController;
    // (undocumented)
    topBar: boolean;
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFormRenderer, "ajf-form", never, { "topBar": "topBar"; }, {}, never, ["[ajfFormTopToolbarButtons]", "[ajfFormSaveButton]", "[ajfFormStartMessageTitle]", "[ajfFormStartMessage]", "[ajfFormEndMessageTitle]", "[ajfFormEndMessage]"]>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormRenderer, never>;
}

// @public (undocumented)
export class AjfFormsModule {
    // (undocumented)
    static forRoot(): ModuleWithProviders<AjfFormsModule>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormsModule, never>;
    // (undocumented)
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfFormsModule>;
    // (undocumented)
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfFormsModule, [typeof i1.AjfBarcodeFieldComponent, typeof i2.AjfBooleanFieldComponent, typeof i3.AjfDateFieldComponent, typeof i4.AjfDateInputFieldComponent, typeof i5.AjfEmptyFieldComponent, typeof i6.AjfFormField, typeof i7.AjfFormPage, typeof i8.AjfFormRenderer, typeof i9.AjfFormulaFieldComponent, typeof i10.AjfInputFieldComponent, typeof i11.AjfMultipleChoiceFieldComponent, typeof i12.AjfNumberFieldComponent, typeof i13.AjfPopover, typeof i14.AjfRangeFieldComponent, typeof i15.AjfSelectHasSearchBarPipe, typeof i16.AjfSelectUseVirtualScroll, typeof i17.AjfSingleChoiceFieldComponent, typeof i18.AjfTableFieldComponent, typeof i19.AjfTextareaFieldComponent, typeof i20.AjfTimeFieldComponent, typeof i21.AjfVideoUrlFieldComponent], [typeof i22.AjfBarcodeModule, typeof i23.AjfCalendarModule, typeof i24.AjfCheckboxGroupModule, typeof i25.AjfCommonModule, typeof i26.AjfFormsModule, typeof i27.AjfPageSliderModule, typeof i28.AjfTimeModule, typeof i29.CommonModule, typeof i30.FormsModule, typeof i31.GicModule, typeof i32.IonicModule, typeof i30.ReactiveFormsModule, typeof i33.AjfTranslocoModule], [typeof i6.AjfFormField, typeof i8.AjfFormRenderer]>;
}

// @public (undocumented)
class AjfFormulaFieldComponent extends AjfBaseFieldComponent<AjfFormulaFieldInstance> implements OnDestroy {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    input: IonInput;
    // (undocumented)
    ngOnDestroy(): void;
    // (undocumented)
    onChange(event: Event): void;
    // (undocumented)
    readonly value: Observable<any>;
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFormulaFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormulaFieldComponent, never>;
}

// @public (undocumented)
export class AjfInputFieldComponent extends AjfInputFieldComponent_2 {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfInputFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfInputFieldComponent, never>;
}

// @public (undocumented)
export class AjfMultipleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfMultipleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfMultipleChoiceFieldComponent<any>, [null, null, null, { optional: true; }]>;
}

// @public (undocumented)
export class AjfNumberFieldComponent extends AjfInputFieldComponent_2 implements OnDestroy, OnInit {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    ngOnDestroy(): void;
    // (undocumented)
    ngOnInit(): void;
    // (undocumented)
    setValue(value: any): void;
    // (undocumented)
    readonly value: Observable<number | null>;
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfNumberFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfNumberFieldComponent, never>;
}

// @public (undocumented)
class AjfPopover {
    // (undocumented)
    hint: string;
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfPopover, "ajf-ion-popover", never, { "hint": "hint"; }, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfPopover, never>;
}

// @public (undocumented)
export class AjfRangeFieldComponent extends AjfRange {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfRangeFieldComponent, "ajf-range", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfRangeFieldComponent, never>;
}

// @public (undocumented)
class AjfSelectHasSearchBarPipe implements PipeTransform {
    // (undocumented)
    transform(instance: AjfFieldWithChoicesInstance<any>, searchThreshold: number): boolean;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfSelectHasSearchBarPipe, never>;
    // (undocumented)
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfSelectHasSearchBarPipe, "ajfSelectHasSearchBar">;
}

// @public (undocumented)
class AjfSelectUseVirtualScroll implements PipeTransform {
    // (undocumented)
    transform(instance: AjfFieldWithChoicesInstance<any>, vsThreshold: number): boolean;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfSelectUseVirtualScroll, never>;
    // (undocumented)
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfSelectUseVirtualScroll, "ajfSelectUseVirtualScroll">;
}

// @public (undocumented)
export class AjfSingleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfSingleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfSingleChoiceFieldComponent<any>, [null, null, null, { optional: true; }]>;
}

// @public (undocumented)
export class AjfTableFieldComponent extends AjfTableFieldComponent_2 {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTableFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTableFieldComponent, never>;
}

// @public (undocumented)
export class AjfTextareaFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTextareaFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTextareaFieldComponent, never>;
}

// @public (undocumented)
export class AjfTimeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTimeFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTimeFieldComponent, never>;
}

// @public (undocumented)
class AjfVideoUrlFieldComponent extends AjfVideoUrlFieldComponent_2 {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, domSanitizer: DomSanitizer, httpClient: HttpClient);
    // (undocumented)
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfVideoUrlFieldComponent, "ng-component", never, {}, {}, never, never>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfVideoUrlFieldComponent, never>;
}

// @public (undocumented)
export class AjfWarningAlertService implements AjfWarningAlertService_2 {
    constructor(_alertCtrl: AlertController);
    // (undocumented)
    showWarningAlertPrompt(warnings: string[]): Observable<AjfFieldWarningAlertResult>;
    // (undocumented)
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfWarningAlertService, never>;
    // (undocumented)
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfWarningAlertService>;
}

// (No @packageDocumentation comment for this package)

```