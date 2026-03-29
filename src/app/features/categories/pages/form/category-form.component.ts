import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent {

  form: FormGroup;
  isViewMode = false;

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      categoryID: [0, Validators.required],
        categoryName: ['', [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3)
        ]],
        description: ['', [
          Validators.required,
          Validators.maxLength(200)
        ]]
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.isViewMode = this.route.snapshot.routeConfig?.path?.includes('view') ?? false;

    if (id && id !== 0) {
      this.service.getById(id).subscribe(category => {
        this.form.patchValue({
          categoryID: category.categoryID,
          categoryName: category.categoryName,
          description: category.description
          // picture: category.picture
        });

        if (this.isViewMode) {
          this.form.disable();
        }

      });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const category: Category = this.form.value;

    const isEdit = category.categoryID && category.categoryID !== 0;

    if (isEdit) {
      this.service.update(category).subscribe({
        next: () => {
          alert('Categoria atualizada!');
          this.router.navigate(['/categories']);
        },
        error: (err: any) => {
          console.error(err);
          alert('Erro ao atualizar');
        }
      });
    } else {
      this.service.create(category).subscribe({
        next: () => {
          alert('Categoria criada!');
          this.router.navigate(['/categories']);
        },
        error: (err: any) => {
          console.error(err);
          alert('Erro ao salvar');
        }
      });
    }
  }

}
