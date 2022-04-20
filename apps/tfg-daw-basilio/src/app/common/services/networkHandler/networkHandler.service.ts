import { fromEvent, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NetworkHandlerService {
  private subscriptions: Subscription[] = [];

  public constructor() {}

  public addHandlerForEvent(
    eventName: string,
    callback: (event: Event) => void
  ) {
    const subscription = fromEvent(window, eventName).subscribe(callback);
    this.subscriptions = [...this.subscriptions, subscription];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
