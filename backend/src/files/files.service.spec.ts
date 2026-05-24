import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { FilesService } from './files.service';

const mockPutObject = jest.fn();

jest.mock('minio', () => ({
  Client: jest.fn().mockImplementation(() => ({
    putObject: mockPutObject,
  })),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const uuidV4Mock = uuidv4 as unknown as jest.MockedFunction<() => string>;

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    process.env.MINIO_ROOT_USER = 'minio-user';
    process.env.MINIO_ROOT_PASSWORD = 'minio-pass';
    uuidV4Mock.mockReturnValue('uuid-1');

    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.MINIO_ROOT_USER;
    delete process.env.MINIO_ROOT_PASSWORD;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload file to MinIO and return public url', async () => {
    const file = {
      originalname: 'chair.png',
      buffer: Buffer.from('image'),
      size: 5,
    } as Express.Multer.File;

    const result = await service.uploadFile(file);

    expect(mockPutObject).toHaveBeenCalledWith(
      'avion-images',
      'uuid-1-chair.png',
      file.buffer,
      file.size,
    );
    expect(result).toBe('http://localhost:9000/avion-images/uuid-1-chair.png');
  });
});
