export class DocumentService {
    public addEventListener(element: HTMLElement, eventName: string, callback: (event: HTMLElement) => void): void {
        element.addEventListener(eventName, (event: Event) => callback(event.target as HTMLElement));
    }

    public removeEventListener(element: HTMLElement, eventName: string, callback: (event: HTMLElement) => void): void {
        element.removeEventListener(eventName, (event: Event) => callback(event.target as HTMLElement));
    }

    public isDocumentScrolledToBottom(minimumSpace: number = 0) {
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.body.offsetHeight - (minimumSpace || 0);
        return scrollPosition >= threshold;
    }

    public getHeight(element: HTMLElement): number {
        return element.offsetHeight;
    }
}