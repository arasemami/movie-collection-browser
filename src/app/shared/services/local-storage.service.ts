import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): any | undefined {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return undefined
    }
}
