import { access, mkdir, rm } from 'fs/promises';

const BASE_URL = process.env.BASE_URL as string;
const PUBLIC_DIR = process.env.PUBLIC_DIR as string;

const createDirIfNotExists = async (dir: string) => {
    if (!await isExists(dir)) {
        await mkdir(dir, {recursive: true})
    }

    return dir;
}

const deleteFileOrDir = async (path: string) => {
    try {
        await rm(path, { recursive: true, force: true });
    } catch (error) {
    }
}

const isExists = async (path: string) => {
    try {
        await access(path);

        return true;
    } catch (error) {
        return false;
    }
}

export {
    BASE_URL,
    PUBLIC_DIR,
    createDirIfNotExists,
    deleteFileOrDir,
    isExists
};
