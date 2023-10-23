import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ExpertiseDocument extends AbstractDocument {
  @Prop()
  name: string;
  @Prop()
  description: string;
}

export const ExpertiseSchema = SchemaFactory.createForClass(ExpertiseDocument);
