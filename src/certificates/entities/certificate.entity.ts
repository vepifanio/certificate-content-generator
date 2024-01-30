export class Certificate {
  id: string;
  title: string;
  content: string;
  initialDate: Date;
  endDate?: Date;
  hours: number;
  createdAt: Date;
  updatedAt: Date;

  resolveContent(
    contentVariables: { [key: string]: string | number } = {},
  ): string {
    const contentTextResolved = Object.keys(contentVariables).reduce(
      (text, key) => {
        return text.replace(`{{${key}}}`, String(contentVariables[key]));
      },
      this.content,
    );

    const remainingVariables = contentTextResolved.match(/{{(\w+)}}/gim);

    if (remainingVariables) {
      const errorText = `Some required content variables are undefined: ${remainingVariables.join(', ')}`;

      throw new Error(errorText);
    }

    return contentTextResolved;
  }
}
