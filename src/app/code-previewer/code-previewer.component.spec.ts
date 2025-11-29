import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodePreviewerComponent } from './code-previewer.component';

describe('CodePreviewerComponent', () => {
  let component: CodePreviewerComponent;
  let fixture: ComponentFixture<CodePreviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodePreviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodePreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});