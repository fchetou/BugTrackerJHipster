import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBlog } from 'app/shared/model/blog.model';
import { Subscription } from 'rxjs';
import { BlogService } from 'app/entities/blog/blog.service';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BlogDeleteDialogComponent } from 'app/entities/blog/blog-delete-dialog.component';

@Component({
  selector: 'jhi-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.scss']
})
export class MyblogsComponent implements OnInit, OnDestroy {
  blogs: IBlog[];
  eventSubscriber: Subscription;

  constructor(protected blogService: BlogService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadMyBlogs() {
    this.blogService.queryMyBlogs().subscribe((res: HttpResponse<IBlog[]>) => {
      this.blogs = res.body;
    });
  }

  ngOnInit() {
    this.loadMyBlogs();
    this.registerChangeInBlogs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBlog) {
    return item.id;
  }

  registerChangeInBlogs() {
    this.eventSubscriber = this.eventManager.subscribe('blogListModification', () => this.loadMyBlogs());
  }

  delete(blog: IBlog) {
    const modalRef = this.modalService.open(BlogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.blog = blog;
  }
}
