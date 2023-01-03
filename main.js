import "./style.css";

const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_XLINK = "http://www.w3.org/1999/xlink";

function getPathPoints(d, step = 10) {
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", d);

  const length = path.getTotalLength();

  const count = length / step;

  const points = [];

  for (let i = 0; i < count + 1; i++) {
    const n = i * step;
    points.push(path.getPointAtLength(n));
  }

  return points;
}

function getDemoPath() {
  const path = document.querySelector("path");
  const d = path.getAttribute("d");
  return d;
}

const drawPoints = (ps) => {
  const svg = document.querySelector("svg");
  ps.forEach((p) => {
    let use = document.createElementNS(SVG_NS, "use");
    use.setAttributeNS(SVG_XLINK, "xlink:href", "#gc");
    use.setAttribute("x", p.x);
    use.setAttribute("y", p.y);
    svg.appendChild(use);
  });
};

const addEndPoints = (ps) => {
  console.log(ps);
  if (ps.length < 4) {
    return console.log("Line segment needs at least 4 points");
  }
  const ys = Math.abs(ps[2].y - ps[1].y);
  const xs = Math.abs(ps[2].x - ps[1].x);
  const ye = Math.abs(ps[ps.length - 2].y - ps[ps.length - 3].y);
  const xe = Math.abs(ps[ps.length - 2].x - ps[ps.length - 3].x);

  let use = document.createElementNS(SVG_NS, "use");
  use.setAttributeNS(SVG_XLINK, "xlink:href", "#gc");
  use.setAttribute("x", xs);
  use.setAttribute("y", ys);
  console.log(use);
};

const d = getDemoPath();
const ps = getPathPoints(d);

drawPoints(ps);
addEndPoints(ps);
