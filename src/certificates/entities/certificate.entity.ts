import { randomUUID } from 'crypto';
import { Document } from './document.entity';
import * as moment from 'moment';

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

    if (!this.isPeriodValid(initialDate, endDate)) {
      throw new Error("End date can't be after the initial date.");
    }

    if (!this.isHoursValid(hours)) {
      throw new Error('Hours cannot be less than 1.');
    }

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

  setTitle(value: string) {
    this.title = value;
    this.update();
  }

  getContent() {
    return this.content;
  }

  setContent(value: string) {
    this.content = value;
    this.update();
  }

  getInitialDate() {
    return this.initialDate;
  }

  setInitialDate(date: Date) {
    if (!Certificate.isPeriodValid(date, this.endDate)) {
      throw new Error('Initial date cannot be after end date.');
    }

    this.initialDate = date;
    this.update();
  }

  getEndDate() {
    return this.endDate;
  }

  setEndDate(date: Date | undefined) {
    if (!Certificate.isPeriodValid(this.initialDate, date)) {
      throw new Error('End date cannot be before initial date.');
    }

    this.endDate = date;
    this.update();
  }

  getHours() {
    return this.hours;
  }

  setHours(value: number) {
    this.hours = value;
    this.update();
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
    console.log(contentVariables);
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

  static isPeriodValid(initialDate: Date, endDate?: Date): boolean {
    if (endDate && moment(endDate).isBefore(initialDate)) {
      return false;
    }

    return true;
  }

  static isHoursValid(hours: number) {
    if (hours <= 0) {
      return false;
    }

    return true;
  }
}
