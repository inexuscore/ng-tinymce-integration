import { Component, OnInit } from '@angular/core';
import { AsyncSubject, Subject } from 'rxjs';
import { Editor, EditorSettings } from 'tinymce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  settings: EditorSettings;
  editor: Editor;
  editorSubject: Subject<any> = new AsyncSubject();

  ngOnInit() {
    this.setupEditor();
  }

  setupEditor() {
    this.settings = {
      base_url: '/tinymce',
      suffix: '.min',
      height: 500,
      menubar: false,
      toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
      external_plugins: {},
      setup: (editor: Editor) => {
        this.editor = editor;
      }
    };
  }

  onEditorInit(event: any) {
    this.editorSubject.next(event.editor);
    this.editorSubject.complete();
  }

  getText() {
    const text = this.editor.getContent({ format: 'text' });
    alert(text);
  }
}
