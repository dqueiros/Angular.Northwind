import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { RouterModule } from '@angular/router';
import { ConfirmModal } from '../../../../shared/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmModal],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {

  // categories: Category[] = [];
  categories = signal<Category[]>([]);
  isDeleting = false;

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getAll()
      .subscribe(data => {
        this.categories.set(data);
      });
  }

  selectedCategoryId: number | null = null;
  isModalOpen = false;

  openDeleteModal(id: number) {
    this.selectedCategoryId = id;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedCategoryId = null;
  }

  confirmDelete() {
    if (this.selectedCategoryId === null || this.isDeleting) return;

    this.isDeleting = true;

    const id = this.selectedCategoryId;

    this.categoryService.delete(id).subscribe({
      next: () => {
        this.categories.set(
          this.categories().filter((c: Category) => c.categoryID !== id)
        );
        this.closeModal();
        this.isDeleting = false;
      },
      error: (err: any) => {
        console.error(err);
        alert('Erro ao excluir');
        this.isDeleting = false;
      }
    });
  }

}
