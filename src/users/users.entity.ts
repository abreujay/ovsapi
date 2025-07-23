import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', nullable: false })
  userName: string;

  @Column({ name: 'age', nullable: false })
  age: number;

  @Column({ name: 'profession', nullable: false })
  profession: string;
  
  @Column({ name: 'face_file_path', nullable: true })
  faceFilePath: string;

  @Column({ name: 'facetoken', nullable: true })
  faceToken: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}