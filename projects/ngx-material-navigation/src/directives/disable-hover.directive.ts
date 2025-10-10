// stop-hover-capture.directive.ts
import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

/**
 * Disables 'mouseenter', 'mouseover', 'pointerenter', 'pointermove' and 'mousemove'.
 */
@Directive({
    selector: '[disableHover]',
    standalone: true
})
export class DisableHoverDirective implements OnInit, OnDestroy {
    private readonly unsubscribeFunctions: (() => void)[] = [];
    private readonly events: string[] = ['mouseenter', 'mouseover', 'pointerenter', 'pointermove', 'mousemove'];

    constructor(private readonly el: ElementRef<HTMLElement>) {}

    ngOnInit(): void {
        for (const ev of this.events) {
            const listener: EventListener = (e: Event) => {
                e.stopImmediatePropagation?.();
                e.stopPropagation?.();
                e.preventDefault?.();
            };
            this.el.nativeElement.addEventListener(ev, listener, { capture: true });
            this.unsubscribeFunctions.push(() => this.el.nativeElement.removeEventListener(ev, listener, { capture: true }));
        }
    }

    ngOnDestroy(): void {
        for (const fn of this.unsubscribeFunctions) {
            fn();
        }
    }
}