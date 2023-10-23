import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class JobDocument extends AbstractDocument {
  @Prop()
  expertise: string[];
  @Prop()
  subject: string;
  @Prop()
  description: string;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  budget: number;
  @Prop()
  location: string;
  @Prop()
  timestamp: Date;
}

export const JobSchema = SchemaFactory.createForClass(JobDocument);
