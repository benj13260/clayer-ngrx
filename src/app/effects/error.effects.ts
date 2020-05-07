import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import { errorMessage } from '../actions/commons/error.actions'

@Injectable()
export class ErrorEffects {
    constructor(private readonly actions$: Actions) {}

    handleError$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(errorMessage),
          map(action => action.errorMsg),
          tap(errorMsg => console.error('Got error: '+ errorMsg))
        ),
      { dispatch: false }
    );
}

