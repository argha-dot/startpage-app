interface PsuedoFSI {
  [index: string]: string | PsuedoFSI;
}

export interface FlattenedLinks {
  [index: string]: string;
}

class PsuedoFS {
  fs: PsuedoFSI;

  constructor(fs: PsuedoFSI = {}) {
    this.fs = fs;
  }

  splitPath(path: string): string[] {
    return path
      .trim()
      .replace(/^\.|\.$/gm, "")
      .split(".");
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
    const splitPath = this.splitPath(path);

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

    // const fs = this.navigateToPath(path);
    // console.log(fs);
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

  getAllLinks(
    prefix?: string,
    result?: FlattenedLinks,
    fs?: PsuedoFSI
  ): FlattenedLinks {
    result = result || {};

    fs = fs || this.fs;
    prefix = prefix ? `${prefix}.` : "";

    for (let i in fs) {
      if (Object.prototype.hasOwnProperty.call(fs, i)) {
        if (typeof fs[i] === "object" && fs[i] !== null) {
          this.getAllLinks(`${prefix}${i}`, result, fs[i] as PsuedoFSI);
        } else {
          result[`${prefix}${i}`] = fs[i] as string;
        }
      }
    }

    return result;
  }

  addNode(
    currPath: string,
    type: "file" | "folder",
    name: string,
    link?: string
  ): void {
    if (!this.isPath(currPath)) {
      throw Error("Path doesn't exist");
    }

    if (this.nodeType(currPath) !== "folder") {
      throw Error("Path is a file");
    }

    if (name.length < 1) throw Error("Name can't be empty");

    const fs = this.navigateToPath(currPath) as PsuedoFSI;
    // fs[name] = {}

    if (type === "file") {
      if (!link || link.length < 1) throw new Error("No link given");

      fs[name] = link;
    } else {
      fs[name] = {};
    }
  }

  deleteNode(currPath: string, name: string) {
    if (!this.isPath(`${currPath}.${name}`)) {
      throw Error("Path doesn't exist");
    }

    if (name.length < 1) throw Error("Name can't be empty");
    const fs = this.navigateToPath(currPath) as PsuedoFSI;
    delete fs[name];
  }

  renameNode(
    currPath: string,
    name: string,
    newName?: string,
    newLink?: string
  ) {
    const fullPath = `${currPath}.${name}`;
    if (!this.isPath(fullPath)) {
      throw Error("Path doesn't exist");
    }

    const fs = this.navigateToPath(currPath) as PsuedoFSI;

    if (this.nodeType(fullPath) === "file") {
      if (newName && newName.length >= 1) {
        if (newLink && newLink.length >= 1) {
          this.deleteNode(currPath, name);
          this.addNode(currPath, "file", newName, newLink);
        } else {
          const prevLink = fs[name] as string;
          this.deleteNode(currPath, name);
          this.addNode(currPath, "file", newName, prevLink);
        }
      } else {
        if (!newLink || newLink.length === 0) {
          throw Error("Atleast one of new name and newLink must be present");
        }
        fs[name] = newLink;
      }
    } else {
      if (newName && newName.length >= 1) {
        fs[newName] = this.ls(`${currPath}.${name}`);

        this.deleteNode(currPath, name);
      }
    }
  }

  get getFs(): PsuedoFSI {
    return this.fs;
  }
}

export default PsuedoFS;
export type { PsuedoFSI };
