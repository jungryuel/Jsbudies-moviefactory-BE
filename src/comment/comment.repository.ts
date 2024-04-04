import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { ReadCommentDto } from './dto/ReadCommentDto';

export class CommentRepository extends Repository<Comment> {}
