import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ModalComponent } from './modal/modal.component';
import { RefDirective } from './ref.directive';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	@ViewChild(RefDirective) refDir!: RefDirective

	constructor(private resolver: ComponentFactoryResolver, private title: Title, private meta: Meta) {
		this.meta.addTags([
			{ name: 'Petya', content: 'amgular, googleeeee' },
			{ name: 'description', content: 'this is app component' }
		])
		title.setTitle('AppComponent Page');
	}
	showModal() {
		const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
		const component = this.refDir.containerRef.createComponent(modalFactory);
		component.instance.title = 'Dynamic title';
		component.instance.close.subscribe(() => {
			this.refDir.containerRef.clear();
		})
	}
}
