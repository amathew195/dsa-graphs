/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    // let node = new Node(vertex);
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    //remove it from nodes property on graph
    this.nodes.delete(vertex);

    //update any adjacency lists using that vertex
    for (const neighbor of vertex.adjacent) {
      neighbor.adjacent.delete(vertex);
    }
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    const nodesArr = [];

    while (toVisitStack.length > 0) {
      let currNode = toVisitStack.pop();
      nodesArr.push(currNode.value);

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodesArr;
  }

  /** traverse graph with BFS and returns array of Node values */
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    const nodesArr = [];

    while (toVisitQueue.length > 0) {
      let currNode = toVisitQueue.shift();
      nodesArr.push(currNode.value);

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodesArr;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end, seen = new Set([start])) {
    if (start === end) return 0;
    let shortestDistance = Infinity;

    for (let neighbor of start.adjacent) {
      if (!seen.has(neighbor)) {
        if (neighbor === end) {
          return 1;
        } else {
          seen.add(neighbor);
          console.log(neighbor);
          shortestDistance = Math.min(
            1 + this.distanceOfShortestPath(neighbor, end, seen),
            shortestDistance
          );
        }
      }
    }
    return shortestDistance;
  }
}

module.exports = { Graph, Node };
