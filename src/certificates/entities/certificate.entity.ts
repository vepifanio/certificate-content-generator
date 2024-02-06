import { randomUUID } from 'crypto';
import { Document } from './document.entity';

export class Certificate {
  constructor(
    private id: string,
    private title: string,
    private content: string,
    private initialDate: Date,
    private endDate: Date | undefined,
    private hours: number,
    private documents: Document[],
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(
    title: string,
    content: string,
    initialDate: Date,
    endDate: Date | undefined,
    hours: number,
  ) {
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();
    const documents: Document[] = [];

    return new Certificate(
      id,
      title,
      content,
      initialDate,
      endDate,
      hours,
      documents,
      createdAt,
      updatedAt,
    );
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getContent() {
    return this.content;
  }

  getInitialDate() {
    return this.initialDate;
  }

  getEndDate() {
    return this.endDate;
  }

  getHours() {
    return this.hours;
  }

  getDocuments() {
    return this.documents;
  }

  setDocuments(documents: Document[]) {
    this.documents = documents;
    this.update();
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  private update() {
    this.updatedAt = new Date();
  }

  resolveContent(
    contentVariables: { [key: string]: string | number } = {},
  ): string {
    const contentTextResolved = Object.keys(contentVariables).reduce(
      (text, key) => {
        return text.replace(`[[${key}]]`, String(contentVariables[key]));
      },
      this.content,
    );

    const remainingVariables = contentTextResolved.match(/\[\[(\w+)]]/gim);

    if (remainingVariables) {
      const formattedRemainingVariables = remainingVariables.map((variable) =>
        variable.replaceAll(/\[|]/g, ''),
      );

      const errorText = `Some required content variables are undefined: ${formattedRemainingVariables.join(', ')}`;

      throw new Error(errorText);
    }

    return contentTextResolved;
  }
}
