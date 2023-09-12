import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {BACKEND_API_KEY} from "../../app.config";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  backendApiKey = inject(BACKEND_API_KEY);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        API_KEY:
          this.backendApiKey,
      },
    });

    // Pass the cloned request to the next handler
    return next.handle(clonedRequest);
  }
}
