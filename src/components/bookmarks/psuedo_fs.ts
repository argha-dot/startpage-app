interface PsuedoFSI {
  [index: string]: string | PsuedoFSI;
}

class PsuedoFS {
  fs: PsuedoFSI;

  constructor(fs: PsuedoFSI = {}) {
    this.fs = fs;
  }

  addFolder(name: string) {
    this.fs = {
      ...this.fs,
      [name]: {},
    };
  }

  isPath(path: string, fs: PsuedoFSI = this.fs): boolean {
    const splitPath = path
      .trim()
      .replace(/^\.|\.$/gm, "")
      .split(".");

    // console.log(splitPath, fs)
    if (splitPath[0].length === 0 && splitPath.length === 1) {
      return true;
    }
    if (!(splitPath[0] in fs)) {
      // console.log(`${splitPath[0]} not found in`, fs)
      return false;
    }
    // console.log(`${splitPath[0]} found in`, fs)
    return this.isPath(
      splitPath.slice(1).join("."),
      typeof fs[splitPath[0]] === "string"
        ? {}
        : (fs[splitPath[0]] as PsuedoFSI)
    );
  }

  navigateToPath(path: string): string | PsuedoFSI {
    const splitPath = path.split(".");

    let fs: string | PsuedoFSI = this.fs;
    for (const p of splitPath) {
      if (p === "") {
        // @ts-ignore
        fs = fs;
      } else {
        // @ts-ignore
        fs = fs[p];
      }
      // console.log(p, typeof(fs))
    }

    return fs;
  }

  nodeType(path: string): "file" | "folder" {
    // const splitPath = path.split(".")
    if (!this.isPath(path)) {
      throw Error("Path doesn't exist");
    }

    const fs = this.navigateToPath(path);

    if (typeof fs === "string") {
      return "file";
    } else {
      return "folder";
    }
  }

  getLink(path: string): string {
    if (!this.isPath(path)) {
      throw Error("Path doesn't exist");
    }

    if (this.nodeType(path) !== "file") {
      throw Error("Path is not a file");
    }

    const fs = this.navigateToPath(path);
    console.log(fs);
    return this.navigateToPath(path) as string;
  }

  ls(path: string): PsuedoFSI {
    if (!this.isPath(path)) {
      throw Error("Path doesn't exist");
    }

    if (this.nodeType(path) !== "folder") {
      throw Error("Path is a file");
    }

    return this.navigateToPath(path) as PsuedoFSI;
  }

  addLink(currPath: string, type: "file" | "folder", name: string, link?: string): void {
    if (!this.isPath(currPath)) {
      throw Error("Path doesn't exist");
    }

    if (type === "file") {
      link && (this.fs = { ...this.fs, [name]: link })
    } else {
      this.fs = { ...this.fs, [name]: {} };
    }
  }

  getFs(): PsuedoFSI {
    return this.fs;
  }
}

export default PsuedoFS;
export type { PsuedoFSI };
