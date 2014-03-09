var Haeckel;
(function (Haeckel) {
    function isModel(o) {
        return o !== null && typeof o === "object" && typeof o.hash === "string";
    }
    Haeckel.isModel = isModel;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isSet(o) {
        return Haeckel.isModel(o) && typeof o.empty === "boolean";
    }
    Haeckel.isSet = isSet;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isExtSet(o) {
        return Haeckel.isSet(o) && typeof o.hashMap === "object" && typeof o.size === "number";
    }
    Haeckel.isExtSet = isExtSet;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isEntity(o) {
        return Haeckel.isModel(o) && typeof o.uid === "string";
    }
    Haeckel.isEntity = isEntity;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isWeightedStates(o) {
        return typeof o === "object" && (o.states === null || Haeckel.isSet(o.states)) && typeof o.weight === "number";
    }
    Haeckel.isWeightedStates = isWeightedStates;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isInferrer(o) {
        return typeof o === "object" && typeof o.average === "function";
    }
    Haeckel.isInferrer = isInferrer;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isRange(o) {
        return Haeckel.isSet(o) && typeof o.max === "number" && typeof o.min === "number" && typeof o.mean === "number" && typeof o.size === "number";
    }
    Haeckel.isRange = isRange;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isCharacter(o) {
        if (!Haeckel.isEntity(o)) {
            return false;
        }
        if (o.distance !== undefined && typeof o.distance !== "function") {
            return false;
        }
        if (o.inferrer !== undefined && !Haeckel.isInferrer(o)) {
            return false;
        }
        return typeof o.combine === "function" && Haeckel.isSet(o.domain) && typeof o.readStates === "function";
    }
    Haeckel.isCharacter = isCharacter;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isTaxic(o) {
        return Haeckel.isSet(o) && typeof o.isUnit === "boolean" && Haeckel.isExtSet(o.entities) && Haeckel.isExtSet(o.units);
    }
    Haeckel.isTaxic = isTaxic;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isCharacterMatrix(o) {
        return typeof o === "object" && Haeckel.isExtSet(o.characters) && Array.isArray(o.characterList) && typeof o.hashMap === "object" && Haeckel.isTaxic(o.taxon);
    }
    Haeckel.isCharacterMatrix = isCharacterMatrix;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isDating(o) {
        return Haeckel.isModel(o) && Haeckel.isExtSet(o.taxa) && Haeckel.isRange(o.time);
    }
    Haeckel.isDating = isDating;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isArc(o) {
        return Array.isArray(o) && o.length >= 2;
    }
    Haeckel.isArc = isArc;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isDigraph(o) {
        return Array.isArray(o) && o.length === 2 && Haeckel.isExtSet(o.arcs) && Haeckel.isExtSet(o.vertices);
    }
    Haeckel.isDigraph = isDigraph;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isDistanceMatrix(o) {
        return typeof o === "object" && typeof o.hashMap === "object" && Haeckel.isExtSet(o.members);
    }
    Haeckel.isDistanceMatrix = isDistanceMatrix;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isNomenclature(o) {
        return typeof o.nameMap === "object" && Haeckel.isExtSet(o.names) && Haeckel.isExtSet(o.taxa);
    }
    Haeckel.isNomenclature = isNomenclature;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isStratum(o) {
        return Haeckel.isModel(o) && typeof o.type === "string" && typeof o.name === "string" && Haeckel.isRange(o.start) && Haeckel.isRange(o.end);
    }
    Haeckel.isStratum = isStratum;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var ElementBuilder = (function () {
        function ElementBuilder(document, a, b) {
            if (typeof b === "undefined") { b = null; }
            this.document = document;
            if (typeof a === 'string') {
                this.element = b === null ? document.createElement(a) : document.createElementNS(a, b);
            } else {
                this.element = a;
            }
        }
        ElementBuilder.style = function (attrs) {
            var value = '';
            for (var style in attrs) {
                value += style + ':' + String(attrs[style]) + ';';
            }
            return value;
        };

        ElementBuilder.prototype.attr = function (a, b, c) {
            if (typeof c === "undefined") { c = null; }
            c === null ? this.element.setAttribute(a, b) : this.element.setAttributeNS(a, b, c);
            return this;
        };

        ElementBuilder.prototype.attrs = function (a, b) {
            if (typeof b === "undefined") { b = null; }
            var uri = typeof a === 'string' ? a : null, attrs = uri ? b : a;
            for (var name in attrs) {
                uri === null ? this.element.setAttribute(name, attrs[name]) : this.element.setAttributeNS(uri, name, attrs[name]);
            }
            return this;
        };

        ElementBuilder.prototype.build = function () {
            return this.element;
        };

        ElementBuilder.prototype.child = function (a, b) {
            if (typeof b === "undefined") { b = null; }
            var child = new ElementBuilder(this.document, a, b);
            child._parent = this;
            this.element.appendChild(child.element);
            return child;
        };

        ElementBuilder.prototype.detach = function () {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
                this._parent = null;
            }
            return this;
        };

        ElementBuilder.prototype.parent = function () {
            return this._parent;
        };

        ElementBuilder.prototype.reset = function () {
            this.element = null;
            this._parent = null;
            return this;
        };

        ElementBuilder.prototype.text = function (data) {
            this.element.appendChild(this.document.createTextNode(data));
            return this;
        };
        return ElementBuilder;
    })();
    Haeckel.ElementBuilder = ElementBuilder;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.SVG_NS = "http://www.w3.org/2000/svg";
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function hash(object) {
        if (object === undefined || object === null) {
            return undefined;
        }
        if (Array.isArray(object)) {
            var n = object.length, a = new Array(n);
            for (var i = 0; i < n; ++i) {
                a[i] = hash(object[i]);
            }
            return "[" + a.join(",") + "]";
        }
        if (typeof object === 'object') {
            var h = object.hash;
            if (typeof h === "string") {
                return h;
            }
        }
        return JSON.stringify(object, function (key, value) {
            if (typeof value === 'number' && !isFinite(value)) {
                return String(value);
            }
            return value;
        });
    }
    Haeckel.hash = hash;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var ExtSetBuilder = (function () {
        function ExtSetBuilder() {
            this._hashMap = {};
        }
        ExtSetBuilder.prototype.add = function () {
            var elements = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                elements[_i] = arguments[_i + 0];
            }
            return this.addList(elements);
        };

        ExtSetBuilder.prototype.addList = function (elements) {
            for (var i = 0, n = elements.length; i < n; ++i) {
                var element = elements[i];
                if (element === null || element === undefined) {
                    throw new Error("Null or undefined element.");
                }
                this._hashMap[Haeckel.hash(element)] = element;
            }
            return this;
        };

        ExtSetBuilder.prototype.addSet = function (elements) {
            for (var h in elements.hashMap) {
                this._hashMap[h] = elements.hashMap[h];
            }
            return this;
        };

        ExtSetBuilder.prototype.build = function () {
            var s = {
                empty: false,
                hash: '',
                hashMap: {},
                size: NaN
            }, hashes = [];
            for (var h in this._hashMap) {
                s.hashMap[h] = this._hashMap[h];
                hashes.push(h);
            }
            var n = hashes.length;
            if (n === 0) {
                return Haeckel.EMPTY_SET;
            }
            Object.freeze(s.hashMap);
            s.hash = "{" + hashes.sort().join(",") + "}";
            s.size = n;
            return Object.freeze(s);
        };

        ExtSetBuilder.prototype.contains = function (element) {
            return this._hashMap[Haeckel.hash(element)] !== undefined;
        };

        ExtSetBuilder.prototype.remove = function () {
            var elements = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                elements[_i] = arguments[_i + 0];
            }
            return this.removeList(elements);
        };

        ExtSetBuilder.prototype.removeList = function (elements) {
            for (var i = 0, n = elements.length; i < n; ++i) {
                delete this._hashMap[Haeckel.hash(elements[i])];
            }
            return this;
        };

        ExtSetBuilder.prototype.removeSet = function (elements) {
            for (var h in elements.hashMap) {
                delete this._hashMap[h];
            }
            return this;
        };

        ExtSetBuilder.prototype.reset = function () {
            this._hashMap = {};
            return this;
        };
        return ExtSetBuilder;
    })();
    Haeckel.ExtSetBuilder = ExtSetBuilder;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isBitSet(o) {
        return Haeckel.isSet(o) && typeof o.bits === "number";
    }
    Haeckel.isBitSet = isBitSet;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isIntSet(o) {
        return Haeckel.isSet(o) && typeof o.criterion === "function";
    }
    Haeckel.isIntSet = isIntSet;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isPoint(o) {
        return Haeckel.isModel(o) && typeof o.x === 'number' && typeof o.y === 'number';
    }
    Haeckel.isPoint = isPoint;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isRay(o) {
        return Haeckel.isSet(o) && typeof o.angle === "number" && Haeckel.isPoint(o.origin);
    }
    Haeckel.isRay = isRay;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isRectangle(o) {
        return Haeckel.isPoint(o) && typeof o.area === "number" && typeof o.bottom === "number" && typeof o.centerX === "number" && typeof o.centerY === "number" && typeof o.height === "number" && typeof o.left === "number" && typeof o.right === "number" && typeof o.top === "number" && typeof o.width === "number" && typeof o.x2 === "number" && typeof o.y2 === "number";
    }
    Haeckel.isRectangle = isRectangle;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isTypeSet(o) {
        return Haeckel.isSet(o) && typeof o.contains === "function";
    }
    Haeckel.isTypeSet = isTypeSet;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function create() {
        var filter = function (element) {
            return false;
        }, e = {
            angle: NaN,
            area: 0,
            bits: 0,
            bottom: NaN,
            centerX: NaN,
            centerY: NaN,
            contains: filter,
            criterion: filter,
            empty: true,
            entities: null,
            hash: '{}',
            hashMap: Object.freeze({}),
            height: 0,
            isUnit: false,
            left: NaN,
            max: NaN,
            mean: NaN,
            min: NaN,
            origin: Object.freeze({ hash: "(NaN:NaN)", x: NaN, y: NaN }),
            right: NaN,
            size: 0,
            top: NaN,
            units: null,
            width: 0,
            x: NaN,
            x2: NaN,
            y: NaN,
            y2: NaN
        };
        e.units = e.entities = e;
        return Object.freeze(e);
    }

    Haeckel.EMPTY_SET = create();
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (arr) {
        function each(list, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            for (var i = 0, n = list.length; i < n; ++i) {
                if (f.call(thisObject, list[i]) === false) {
                    return;
                }
            }
        }
        arr.each = each;
    })(Haeckel.arr || (Haeckel.arr = {}));
    var arr = Haeckel.arr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (chr) {
        function hashMapStates(map, taxon, character) {
            if (!taxon || taxon.empty) {
                return null;
            }
            var states = null;
            if (taxon.isUnit) {
                states = map[taxon.hash + '@' + character.hash];
                if (states === undefined) {
                    return null;
                }
                return states;
            }
            var statesList = [];
            Haeckel.ext.each(taxon.units, function (unit) {
                statesList.push(hashMapStates(map, unit, character));
            });
            return character.combine(statesList);
        }
        chr.hashMapStates = hashMapStates;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (chr) {
        function states(matrix, taxon, character) {
            return Haeckel.chr.hashMapStates(matrix.hashMap, taxon, character);
        }
        chr.states = states;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function each(set, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            if (set.size === Infinity) {
                throw new Error('Cannot traverse domain sets.');
            }
            for (var h in set.hashMap) {
                if (f.call(thisObject, set.hashMap[h]) === false) {
                    return;
                }
            }
        }
        ext.each = each;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (chr) {
        function definedUnits(matrix, character) {
            var builder = new Haeckel.ExtSetBuilder();
            Haeckel.ext.each(matrix.taxon.units, function (unit) {
                if (Haeckel.chr.states(matrix, unit, character) !== null) {
                    builder.add(unit);
                }
            });
            return builder.build();
        }
        chr.definedUnits = definedUnits;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.RANGE_0 = Object.freeze({
        empty: false,
        hash: "[0...0]",
        max: 0,
        mean: 0,
        min: 0,
        size: 0
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (dst) {
        function hashMapDistance(hashMap, a, b) {
            var aHash = Haeckel.hash(a), bHash = Haeckel.hash(b), result = undefined;
            if (hashMap[aHash] !== undefined) {
                result = hashMap[aHash][bHash];
            }
            if (result === undefined) {
                if (aHash === bHash) {
                    return Haeckel.RANGE_0;
                }
                return Haeckel.EMPTY_SET;
            }
            return result;
        }
        dst.hashMapDistance = hashMapDistance;
    })(Haeckel.dst || (Haeckel.dst = {}));
    var dst = Haeckel.dst;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (dst) {
        function get(matrix, a, b) {
            return Haeckel.dst.hashMapDistance(matrix.hashMap, a, b);
        }
        dst.get = get;
    })(Haeckel.dst || (Haeckel.dst = {}));
    var dst = Haeckel.dst;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function contains(set, element) {
            if (set.size === Infinity) {
                return true;
            }
            return set.hashMap[Haeckel.hash(element)] !== undefined;
        }
        ext.contains = contains;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function equal(a, b) {
        if (a === b) {
            return true;
        }
        if ((typeof a === "number" && isNaN(a)) || (typeof b === "number" && isNaN(b)) || typeof a === "function" || typeof b === "function") {
            return false;
        }
        return Haeckel.hash(a) === Haeckel.hash(b);
    }
    Haeckel.equal = equal;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function intersect(a, b) {
            if (a.empty || b.empty) {
                return Haeckel.EMPTY_SET;
            }
            if (Haeckel.equal(a, b)) {
                return a;
            }
            if (a.size === Infinity) {
                return a;
            }
            if (b.size === Infinity) {
                return b;
            }
            var builder = new Haeckel.ExtSetBuilder();
            if (a.size <= b.size) {
                Haeckel.ext.each(a, function (element) {
                    if (Haeckel.ext.contains(b, element)) {
                        builder.add(element);
                    }
                });
            } else {
                Haeckel.ext.each(b, function (element) {
                    if (Haeckel.ext.contains(a, element)) {
                        builder.add(element);
                    }
                });
            }
            return builder.build();
        }
        ext.intersect = intersect;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function setDiff(minuend, subtrahend) {
            if (minuend.empty || subtrahend.size === Infinity) {
                return Haeckel.EMPTY_SET;
            }
            if (subtrahend.empty) {
                return minuend;
            }
            if (Haeckel.equal(minuend, subtrahend)) {
                return Haeckel.EMPTY_SET;
            }
            if (minuend.size === Infinity) {
                throw new Error('Cannot traverse domain sets.');
            }
            return new Haeckel.ExtSetBuilder().addSet(minuend).removeSet(subtrahend).build();
        }
        ext.setDiff = setDiff;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function create(elements) {
            if (elements.length === 0) {
                return Haeckel.EMPTY_SET;
            }
            return new Haeckel.ExtSetBuilder().addList(elements).build();
        }
        ext.create = create;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function createUnitForEntity(entity) {
            var taxon = {
                empty: false,
                entities: Haeckel.ext.create([entity]),
                hash: '(' + entity.uid + ')',
                isUnit: true,
                units: null
            };
            taxon.units = Haeckel.ext.create([taxon]);
            return Object.freeze(taxon);
        }
        tax.createUnitForEntity = createUnitForEntity;
    })(Haeckel.tax || (Haeckel.tax = {}));
    var tax = Haeckel.tax;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function create(entities) {
            if (entities.empty) {
                return Haeckel.EMPTY_SET;
            }
            var n = entities.size, uids = new Array(n), i = 0, units = new Haeckel.ExtSetBuilder();
            Haeckel.ext.each(entities, function (entity) {
                uids[i++] = entity.uid;
                units.add(Haeckel.tax.createUnitForEntity(entity));
            });
            uids = uids.sort();
            return Object.freeze({
                empty: false,
                entities: entities,
                hash: '(' + uids.join('|') + ')',
                isUnit: entities.size === 1,
                units: units.build()
            });
        }
        tax.create = create;
    })(Haeckel.tax || (Haeckel.tax = {}));
    var tax = Haeckel.tax;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function setDiff(minuend, subtrahend) {
            return Haeckel.tax.create(Haeckel.ext.setDiff(minuend.entities, subtrahend.entities));
        }
        tax.setDiff = setDiff;
    })(Haeckel.tax || (Haeckel.tax = {}));
    var tax = Haeckel.tax;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function union(taxa) {
            var builder = new Haeckel.ExtSetBuilder();
            for (var i = 0, n = taxa.length; i < n; ++i) {
                builder.addSet(taxa[i].entities);
            }
            return Haeckel.tax.create(builder.build());
        }
        tax.union = union;
    })(Haeckel.tax || (Haeckel.tax = {}));
    var tax = Haeckel.tax;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var SolverCache = (function () {
        function SolverCache() {
            this._results = {};
        }
        SolverCache.prototype.get = function (key) {
            return this._results[key];
        };

        SolverCache.getKey = function (functionName, args) {
            var n = args.length, hashes = new Array(n);
            for (var i = 0; i < n; ++i) {
                hashes[i] = Haeckel.hash(args[i]);
            }
            return functionName + "(" + hashes.join(",") + ")";
        };

        SolverCache.prototype.set = function (key, value) {
            return this._results[key] = value;
        };
        return SolverCache;
    })();
    Haeckel.SolverCache = SolverCache;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DigraphBuilder = (function () {
        function DigraphBuilder() {
            this._arcs = new Haeckel.ExtSetBuilder();
            this._vertices = new Haeckel.ExtSetBuilder();
        }
        DigraphBuilder.prototype.addArc = function (head, tail) {
            this._vertices.add(head, tail);
            this._arcs.add([head, tail]);
            return this;
        };

        DigraphBuilder.prototype.addArcs = function (arcs) {
            var _this = this;
            Haeckel.ext.each(arcs, function (arc) {
                _this.addArc(arc[0], arc[1]);
            }, this);
            return this;
        };

        DigraphBuilder.prototype.addGraph = function (graph) {
            return this.addVertices(graph.vertices).addArcs(graph.arcs);
        };

        DigraphBuilder.prototype.addVertex = function (vertex) {
            this._vertices.add(vertex);
            return this;
        };

        DigraphBuilder.prototype.addVertices = function (vertices) {
            this._vertices.addSet(vertices);
            return this;
        };

        DigraphBuilder.prototype.build = function () {
            var vertices = this._vertices.build(), arcs = this._arcs.build(), result = [vertices, arcs];
            result.arcs = arcs;
            result.vertices = vertices;
            return Object.freeze(result);
        };

        DigraphBuilder.prototype.buildArcs = function () {
            return this._arcs.build();
        };

        DigraphBuilder.prototype.buildSubgraph = function (vertices) {
            vertices = Haeckel.ext.intersect(vertices, this._vertices.build());
            var arcs = new Haeckel.ExtSetBuilder();
            if (!vertices.empty) {
                Haeckel.ext.each(this._arcs.build(), function (arc) {
                    if (Haeckel.ext.contains(vertices, arc[0]) && Haeckel.ext.contains(vertices, arc[1])) {
                        arcs.add(arc);
                    }
                });
            }
            var result = [vertices, arcs.build()];
            result.vertices = vertices;
            result.arcs = result[1];
            return Object.freeze(result);
        };

        DigraphBuilder.prototype.buildVertices = function () {
            return this._vertices.build();
        };

        DigraphBuilder.prototype.containsArc = function (arc) {
            return this._arcs.contains(arc);
        };

        DigraphBuilder.prototype.containsVertex = function (vertex) {
            return this._vertices.contains(vertex);
        };

        DigraphBuilder.prototype.removeArc = function (head, tail) {
            this._arcs.remove([head, tail]);
            return this;
        };

        DigraphBuilder.prototype.removeVertex = function (vertex) {
            if (this._vertices.contains(vertex)) {
                this._vertices.remove(vertex);
                var arcs = this._arcs;
                var h = Haeckel.hash(vertex);
                Haeckel.ext.each(arcs.build(), function (arc) {
                    if (h === Haeckel.hash(arc[0]) || h === Haeckel.hash(arc[1])) {
                        arcs.remove(arc);
                    }
                });
            }
            return this;
        };

        DigraphBuilder.prototype.replaceVertex = function (oldVertex, newVertex) {
            if (Haeckel.equal(oldVertex, newVertex) || !this._vertices.contains(oldVertex)) {
                return this;
            }
            if (this._vertices.contains(newVertex)) {
                throw new Error("Graph already contains " + newVertex + ".");
            }
            this._vertices.remove(oldVertex);
            this._vertices.add(newVertex);
            var arcs = this._arcs, h = Haeckel.hash(oldVertex);
            Haeckel.ext.each(arcs.build(), function (arc) {
                var head = Haeckel.hash(arc[0]) === h, tail = Haeckel.hash(arc[1]) === h;
                if (head || tail) {
                    arcs.remove(arc);
                    arcs.add([head ? newVertex : arc[0], tail ? newVertex : arc[1]]);
                }
            });
            return this;
        };

        DigraphBuilder.prototype.reset = function () {
            this._arcs.reset();
            this._vertices.reset();
            return this;
        };
        return DigraphBuilder;
    })();
    Haeckel.DigraphBuilder = DigraphBuilder;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function create() {
        var g = [Haeckel.EMPTY_SET, Haeckel.EMPTY_SET];
        g.vertices = Haeckel.EMPTY_SET;
        g.arcs = Haeckel.EMPTY_SET;
        return Object.freeze(g);
    }

    Haeckel.EMPTY_DIGRAPH = create();
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function list(set) {
            if (set.size === Infinity) {
                throw new Error('Cannot traverse domain sets.');
            }
            if (set === null || set == undefined) {
                return undefined;
            }
            if (set.empty) {
                return [];
            }
            var l = new Array(set.size), i = 0, h;
            for (h in set.hashMap) {
                l[i++] = set.hashMap[h];
            }
            return l;
        }
        ext.list = list;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DAGBuilder = (function () {
        function DAGBuilder() {
            this._builder = new Haeckel.DigraphBuilder();
            this._closure = null;
            this._reduction = null;
        }
        DAGBuilder.prototype.addArc = function (head, tail) {
            if (Haeckel.equal(head, tail)) {
                throw new Error("Cannot add a loop to a DAG: [" + head + ", " + tail + "].");
            }
            if (this._builder.containsArc([head, tail])) {
                return this;
            }
            if (this._builder.containsArc([tail, head])) {
                throw new Error("Arc would introduce cycle: [" + head + ", " + tail + "].");
            }
            var closure = this.buildClosure();
            if (Haeckel.ext.contains(closure[1], [tail, head])) {
                throw new Error("Arc would introduce cycle: [" + head + ", " + tail + "].");
            }
            this._closure = this._reduction = null;
            this._builder.addArc(head, tail);
            return this;
        };

        DAGBuilder.prototype.addArcs = function (arcs) {
            var _this = this;
            Haeckel.ext.each(arcs, function (arc) {
                _this.addArc(arc[0], arc[1]);
            }, this);
            return this;
        };

        DAGBuilder.prototype.addGraph = function (graph) {
            return this.addVertices(graph.vertices).addArcs(graph.arcs);
        };

        DAGBuilder.prototype.addVertex = function (vertex) {
            this._builder.addVertex(vertex);
            return this;
        };

        DAGBuilder.prototype.addVertices = function (vertices) {
            this._builder.addVertices(vertices);
            return this;
        };

        DAGBuilder.prototype.adjacencyMatrix = function (vertices) {
            if (typeof vertices === "undefined") { vertices = null; }
            if (vertices === null) {
                vertices = Haeckel.ext.list(this.buildVertices());
            }
            var n = vertices.length, matrix = new Array(n);
            if (n === 0) {
                return matrix;
            }
            var basicRow = new Array(n);
            for (var i = 0; i < n; ++i) {
                basicRow[i] = false;
            }
            var indices = {};
            for (var i = 0; i < n; ++i) {
                var vertex = vertices[i];
                matrix[i] = basicRow.concat();
                indices[Haeckel.hash(vertex)] = i;
            }
            Haeckel.ext.each(this.buildArcs(), function (arc) {
                var headIndex = indices[Haeckel.hash(arc[0])], tailIndex = indices[Haeckel.hash(arc[1])];
                matrix[headIndex][tailIndex] = true;
            });
            return matrix;
        };

        DAGBuilder.prototype.build = function () {
            return this._builder.build();
        };

        DAGBuilder.prototype.buildArcs = function () {
            return this._builder.buildArcs();
        };

        DAGBuilder.prototype.buildClosure = function () {
            if (this._closure === null) {
                var vertices = this._builder.buildVertices();
                if (vertices.empty) {
                    return this._closure = Haeckel.EMPTY_DIGRAPH;
                }
                var n = vertices.size, vertexArray = Haeckel.ext.list(vertices), closureMatrix = this.adjacencyMatrix(vertexArray), i, j, k;
                for (k = 0; k < n; ++k) {
                    for (i = 0; i < n; ++i) {
                        if (closureMatrix[i][k]) {
                            for (j = 0; j < n; ++j) {
                                closureMatrix[i][j] = (closureMatrix[i][j] || (closureMatrix[i][k] && closureMatrix[k][j]));
                            }
                        }
                    }
                }
                var arcs = new Haeckel.ExtSetBuilder();
                for (i = 0; i < n; ++i) {
                    for (j = 0; j < n; ++j) {
                        if (closureMatrix[i][j]) {
                            arcs.add([vertexArray[i], vertexArray[j]]);
                        }
                    }
                }
                var closure = [vertices, arcs.build()];
                closure.vertices = vertices;
                closure.arcs = closure[1];
                this._closure = Object.freeze(closure);
            }
            return this._closure;
        };

        DAGBuilder.prototype.buildReduction = function () {
            if (this._reduction === null) {
                var closure = this.buildClosure();
                if (closure.vertices.empty) {
                    return this._reduction = Haeckel.EMPTY_DIGRAPH;
                }
                var arcs = new Haeckel.ExtSetBuilder();
                arcs.addSet(closure.arcs);
                Haeckel.ext.each(closure.vertices, function (x) {
                    Haeckel.ext.each(closure.vertices, function (y) {
                        if (x !== y) {
                            Haeckel.ext.each(closure.vertices, function (z) {
                                if (arcs.contains([x, z]) && arcs.contains([x, y]) && arcs.contains([y, z])) {
                                    arcs.remove([x, z]);
                                }
                            });
                        }
                    });
                });
                var reduction = [closure.vertices, arcs.build()];
                reduction.vertices = closure.vertices;
                reduction.arcs = reduction[1];
                this._reduction = Object.freeze(reduction);
            }
            return this._reduction;
        };

        DAGBuilder.prototype.buildSubgraph = function (vertices) {
            return this._builder.buildSubgraph(vertices);
        };

        DAGBuilder.prototype.buildVertices = function () {
            return this._builder.buildVertices();
        };

        DAGBuilder.prototype.containsArc = function (arc) {
            return this._builder.containsArc(arc);
        };

        DAGBuilder.prototype.containsVertex = function (vertex) {
            return this._builder.containsVertex(vertex);
        };

        DAGBuilder.prototype.removeArc = function (head, tail) {
            this._closure = this._reduction = null;
            this._builder.removeArc(head, tail);
            return this;
        };

        DAGBuilder.prototype.removeVertex = function (vertex) {
            this._closure = this._reduction = null;
            this._builder.removeVertex(vertex);
            return this;
        };

        DAGBuilder.prototype.replaceVertex = function (oldVertex, newVertex) {
            this._closure = this._reduction = null;
            this._builder.replaceVertex(oldVertex, newVertex);
            return this;
        };

        DAGBuilder.prototype.reset = function () {
            this._closure = this._reduction = null;
            this._builder.reset();
            return this;
        };
        return DAGBuilder;
    })();
    Haeckel.DAGBuilder = DAGBuilder;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.PRECISION = 1000000;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.RANGE_0_TO_1 = Object.freeze({
        empty: false,
        hash: "[0...1]",
        max: 1,
        mean: 0.5,
        min: 0,
        size: 1
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.RANGE_1 = Object.freeze({
        empty: false,
        hash: "[1...1]",
        max: 1,
        mean: 1,
        min: 1,
        size: 0
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.RANGE_INF = Object.freeze({
        empty: false,
        hash: "[-Infinity...Infinity]",
        max: Infinity,
        mean: 0,
        min: -Infinity,
        size: Infinity
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.RANGE_NEG_INF = Object.freeze({
        empty: false,
        hash: "[-Infinity...0]",
        max: 0,
        mean: -Infinity,
        min: -Infinity,
        size: Infinity
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.RANGE_POS_INF = Object.freeze({
        empty: false,
        hash: "[0...Infinity]",
        max: Infinity,
        mean: Infinity,
        min: 0,
        size: Infinity
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function create(min, max) {
            if (typeof max === "undefined") { max = NaN; }
            if (isNaN(min)) {
                return Haeckel.EMPTY_SET;
            }
            if (max === Infinity) {
                if (min === 0) {
                    return Haeckel.RANGE_POS_INF;
                }
                if (min === -Infinity) {
                    return Haeckel.RANGE_INF;
                }
            } else if (min === -Infinity && max === 0) {
                return Haeckel.RANGE_NEG_INF;
            }
            min = Math.round(min * Haeckel.PRECISION) / Haeckel.PRECISION;
            if (isNaN(max)) {
                max = min;
            } else {
                max = Math.round(max * Haeckel.PRECISION) / Haeckel.PRECISION;
            }
            if (!(min <= max)) {
                throw new Error(String(min) + " is not less than or equal to " + String(max) + ".");
            }
            if (min === 0) {
                if (max === 1) {
                    return Haeckel.RANGE_0_TO_1;
                }
                if (max === 0) {
                    return Haeckel.RANGE_0;
                }
            } else if (min === 1 && max === 1) {
                return Haeckel.RANGE_1;
            }
            return Object.freeze({
                empty: false,
                hash: "[" + min + "..." + max + "]",
                max: max,
                mean: (max + min) / 2,
                min: min,
                size: max - min
            });
        }
        rng.create = create;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DistanceMatrixBuilder = (function () {
        function DistanceMatrixBuilder() {
            this._hashMap = {};
            this._members = new Haeckel.ExtSetBuilder();
        }
        DistanceMatrixBuilder.prototype.addDistance = function (a, b, d) {
            return this.addRange(a, b, Haeckel.rng.create(d, d));
        };

        DistanceMatrixBuilder.prototype.addRange = function (a, b, range) {
            if (a === null || b === null || a === undefined || b === undefined) {
                throw new Error("Cannot define distance from null or undefined.");
            }
            var aHash = Haeckel.hash(a), bHash = Haeckel.hash(b);
            if (this._hashMap[aHash] === undefined) {
                this._hashMap[aHash] = {};
            }
            if (this._hashMap[bHash] === undefined) {
                this._hashMap[bHash] = {};
            }
            this._hashMap[aHash][bHash] = this._hashMap[bHash][aHash] = range;
            this._members.add(a).add(b);
            return this;
        };

        DistanceMatrixBuilder.prototype.build = function () {
            var hashMap = {};
            for (var aHash in this._hashMap) {
                var row = this._hashMap[aHash], hashMapRow = {};
                for (var bHash in row) {
                    hashMapRow[bHash] = row[bHash];
                }
                hashMap[aHash] = hashMapRow;
            }
            var matrix = {
                hashMap: Object.freeze(hashMap),
                members: this._members.build()
            };
            return Object.freeze(matrix);
        };

        DistanceMatrixBuilder.prototype.get = function (a, b) {
            return Haeckel.dst.hashMapDistance(this._hashMap, a, b);
        };

        DistanceMatrixBuilder.prototype.reset = function () {
            this._hashMap = {};
            this._members.reset();
            return this;
        };
        return DistanceMatrixBuilder;
    })();
    Haeckel.DistanceMatrixBuilder = DistanceMatrixBuilder;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function union(sets) {
            var n = sets.length;
            if (n === 0) {
                return null;
            }
            if (n === 1) {
                return sets[0];
            }
            var builder = new Haeckel.ExtSetBuilder();
            for (var i = 0; i < n; ++i) {
                var set = sets[i];
                if (set) {
                    if (set.size === Infinity) {
                        return set;
                    }
                    builder.addSet(set);
                }
            }
            return builder.build();
        }
        ext.union = union;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DAGSolver = (function () {
        function DAGSolver(graph) {
            this._builder = null;
            this._cache = new Haeckel.SolverCache;
            this._graph = graph;
        }
        Object.defineProperty(DAGSolver.prototype, "arcs", {
            get: function () {
                return this._graph.arcs;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DAGSolver.prototype, "graph", {
            get: function () {
                return this._graph;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DAGSolver.prototype, "sinks", {
            get: function () {
                var key = "sinks", result = this._cache.get(key);
                if (result !== undefined) {
                    return result;
                }

                var builder = new Haeckel.ExtSetBuilder();
                builder.addSet(this._graph.vertices);
                Haeckel.ext.each(this._graph.arcs, function (arc) {
                    builder.remove(arc[0]);
                });

                return this._cache.set(key, builder.build());
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DAGSolver.prototype, "sources", {
            get: function () {
                var key = "sources", result = this._cache.get(key);
                if (result !== undefined) {
                    return result;
                }

                var builder = new Haeckel.ExtSetBuilder();
                builder.addSet(this._graph.vertices);
                Haeckel.ext.each(this._graph.arcs, function (arc) {
                    builder.remove(arc[1]);
                });

                return this._cache.set(key, builder.build());
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DAGSolver.prototype, "vertices", {
            get: function () {
                return this._graph.vertices;
            },
            enumerable: true,
            configurable: true
        });

        DAGSolver.prototype.distance = function (x, y, traversedBuilder) {
            if (typeof traversedBuilder === "undefined") { traversedBuilder = null; }
            var _this = this;
            if (x === y) {
                return 0;
            }
            var xHash = Haeckel.hash(x);
            if (xHash === undefined) {
                return NaN;
            }
            var yHash = Haeckel.hash(y);
            if (yHash === undefined) {
                return NaN;
            }
            if (xHash === yHash) {
                return 0;
            }

            var key = Haeckel.SolverCache.getKey("distance", (xHash < yHash) ? [x, y] : [y, x]), result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            result = Infinity;
            var im = Haeckel.ext.union([this.imPrcs(x), this.imSucs(x)]), record = true;
            if (Haeckel.ext.contains(im, y)) {
                result = 1;
            } else {
                if (traversedBuilder) {
                    record = false;
                } else {
                    traversedBuilder = new Haeckel.ExtSetBuilder();
                }
                traversedBuilder.add(x);
                var untraversed = Haeckel.ext.setDiff(im, traversedBuilder.build());
                Haeckel.ext.each(untraversed, function (unit) {
                    var dUnit = _this.distance(unit, y, traversedBuilder);
                    if (isFinite(dUnit) && dUnit + 1 < result) {
                        result = dUnit + 1;
                    }
                }, this);
                traversedBuilder.remove(x);
            }

            if (record) {
                return this._cache.set(key, result);
            }
            return result;
        };

        DAGSolver.prototype.imPrcs = function (vertex) {
            if (!Haeckel.ext.contains(this._graph.vertices, vertex)) {
                return Haeckel.EMPTY_SET;
            }
            var key = Haeckel.SolverCache.getKey("imPrcs", [vertex]), result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            var builder = new Haeckel.ExtSetBuilder();
            Haeckel.ext.each(this._graph.arcs, function (arc) {
                if (Haeckel.equal(vertex, arc[1])) {
                    builder.add(arc[0]);
                }
            });

            return this._cache.set(key, builder.build());
        };

        DAGSolver.prototype.imSucs = function (vertex) {
            if (!Haeckel.ext.contains(this._graph.vertices, vertex)) {
                return Haeckel.EMPTY_SET;
            }

            var key = Haeckel.SolverCache.getKey("imSucs", [vertex]), result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            var builder = new Haeckel.ExtSetBuilder();
            Haeckel.ext.each(this._graph.arcs, function (arc) {
                if (Haeckel.equal(vertex, arc[0])) {
                    builder.add(arc[1]);
                }
            });

            return this._cache.set(key, builder.build());
        };

        DAGSolver.prototype.prcs = function (vertex) {
            if (!Haeckel.ext.contains(this._graph.vertices, vertex)) {
                return Haeckel.EMPTY_SET;
            }

            var key = Haeckel.SolverCache.getKey("prcs", [vertex]), result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            var builder = new Haeckel.ExtSetBuilder();
            builder.add(vertex);
            Haeckel.ext.each(this._graph.arcs, function (arc) {
                if (Haeckel.equal(vertex, arc[1])) {
                    builder.addSet(this.prcs(arc[0]));
                }
            }, this);

            return this._cache.set(key, builder.build());
        };

        DAGSolver.prototype.subgraph = function (vertices) {
            var key = Haeckel.SolverCache.getKey("subgraph", [vertices]), result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            if (this._builder === null) {
                this._builder = new Haeckel.DAGBuilder().addGraph(this._graph);
            }

            return this._cache.set(key, this._builder.buildSubgraph(vertices));
        };

        DAGSolver.prototype.subgraphSolver = function (vertices) {
            if (vertices.hash === this._graph.vertices.hash) {
                return this;
            }

            var key = Haeckel.SolverCache.getKey("subgraphSolver", [vertices]), result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            return this._cache.set(key, new DAGSolver(this.subgraph(vertices)));
        };

        DAGSolver.prototype.sucs = function (vertex) {
            var _this = this;
            if (!Haeckel.ext.contains(this._graph[0], vertex)) {
                return Haeckel.EMPTY_SET;
            }

            var key = Haeckel.SolverCache.getKey("sucs", [vertex]), result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            var builder = new Haeckel.ExtSetBuilder();
            builder.add(vertex);
            Haeckel.ext.each(this._graph.arcs, function (arc) {
                if (Haeckel.equal(vertex, arc[0])) {
                    builder.addSet(_this.sucs(arc[1]));
                }
            }, this);

            return this._cache.set(key, builder.build());
        };

        DAGSolver.prototype.toDistanceMatrix = function () {
            var builder = new Haeckel.DistanceMatrixBuilder(), vertices = Haeckel.ext.list(this._graph.vertices), n = vertices.length;
            for (var i = 0; i < n; ++i) {
                var x = vertices[i];
                for (var j = i; j < n; ++j) {
                    var y = vertices[j];
                    builder.addDistance(x, y, this.distance(x, y));
                }
            }
            return builder.build();
        };
        return DAGSolver;
    })();
    Haeckel.DAGSolver = DAGSolver;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var CharacterMatrixBuilder = (function () {
        function CharacterMatrixBuilder() {
            this._characterList = [];
            this._characters = new Haeckel.ExtSetBuilder();
            this._hashMap = {};
            this._taxon = Haeckel.EMPTY_SET;
        }
        CharacterMatrixBuilder.prototype._infer = function (timesRun) {
            var _this = this;
            if (timesRun >= 2) {
                return;
            }
            this._characterMatrix = this.build();
            var changes = 0;
            Haeckel.ext.each(this._characterMatrix.characters, function (character) {
                changes += _this._inferCharacter(character);
            }, this);
            if (changes > 0) {
                this._infer(timesRun + 1);
            }
        };

        CharacterMatrixBuilder.prototype._inferCharacter = function (character) {
            var _this = this;
            if (!character.inferrer) {
                return 0;
            }
            var defUnits = Haeckel.chr.definedUnits(this._characterMatrix, character), changes = 0;
            Haeckel.ext.each(Haeckel.ext.setDiff(this._solver.vertices, defUnits), function (unit) {
                changes += _this._inferUnit(character, defUnits, unit);
            }, this);
            return changes;
        };

        CharacterMatrixBuilder.prototype._inferUnit = function (character, definedUnits, unit) {
            var allStates = [], defprcs = Haeckel.ext.intersect(this._solver.prcs(unit), definedUnits), weightedStates = this._weightedStates(character, defprcs, unit);
            allStates.push({ states: character.inferrer.average(weightedStates), weight: 1 });
            var defsucs = Haeckel.ext.intersect(this._solver.sucs(unit), definedUnits);
            weightedStates = this._weightedStates(character, defsucs, unit);
            allStates.push({ states: character.inferrer.average(weightedStates), weight: 1 });
            var states = character.inferrer.average(allStates);
            if (states !== null && !Haeckel.equal(states, this.states(unit, character))) {
                this.states(unit, character, states);
                return 1;
            }
            return 0;
        };

        CharacterMatrixBuilder.prototype._runInference = function () {
            if (this._solver === null) {
                return;
            }
            if (this._distanceMatrix === null) {
                this._distanceMatrix = this._solver.toDistanceMatrix();
            }
            this._infer(0);
        };

        CharacterMatrixBuilder.prototype._weightedStates = function (character, units, focus) {
            var result = [];
            Haeckel.ext.each(units, function (unit) {
                var d = Haeckel.dst.get(this._distanceMatrix, focus, unit).mean;
                result.push({
                    states: Haeckel.chr.states(this._characterMatrix, unit, character),
                    weight: (isFinite(d) && d !== 0) ? (1 / d) : NaN
                });
            }, this);
            return result;
        };

        Object.defineProperty(CharacterMatrixBuilder.prototype, "characterList", {
            get: function () {
                return this._characterList.concat();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(CharacterMatrixBuilder.prototype, "taxon", {
            get: function () {
                return this._taxon;
            },
            enumerable: true,
            configurable: true
        });

        CharacterMatrixBuilder.prototype.add = function (character) {
            this._characters.add(character);
            return this;
        };

        CharacterMatrixBuilder.prototype.addListed = function (character) {
            if (this._characters.contains(character)) {
                throw new Error("Can't add a listed character twice: " + character + ".");
            }
            this._characterList.push(character);
            this._characters.add(character);
            return this;
        };

        CharacterMatrixBuilder.prototype.addMatrix = function (matrix) {
            var _this = this;
            Haeckel.arr.each(matrix.characterList, this.addListed, this);
            Haeckel.ext.each(matrix.taxon.units, function (unit) {
                Haeckel.ext.each(matrix.characters, function (character) {
                    _this.states(unit, character, Haeckel.chr.states(matrix, unit, character));
                }, _this);
            }, this);
            return this;
        };

        CharacterMatrixBuilder.prototype.build = function () {
            var hashMap = {};
            for (var key in this._hashMap) {
                hashMap[key] = this._hashMap[key];
            }
            return Object.freeze({
                characters: this._characters.build(),
                characterList: Object.freeze(this._characterList.concat()),
                hashMap: Object.freeze(hashMap),
                taxon: this._taxon
            });
        };

        CharacterMatrixBuilder.prototype.inferStates = function (solver, distanceMatrix) {
            if (typeof distanceMatrix === "undefined") { distanceMatrix = null; }
            try  {
                this._distanceMatrix = (distanceMatrix === null) ? solver.toDistanceMatrix() : distanceMatrix;
                this._solver = solver;
                this._runInference();
            } finally {
                this._characterMatrix = null;
                this._distanceMatrix = null;
                this._solver = null;
            }
            return this;
        };

        CharacterMatrixBuilder.prototype.removeCharacter = function (character) {
            if (this._characters.contains(character)) {
                this._characters.remove(character);
                this._characterList.splice(this._characterList.indexOf(character), 1);
                var h = '@' + character.hash, n = h.length, key;
                for (key in this._hashMap) {
                    if (key.substr(key.length - n) === h) {
                        delete this._hashMap[key];
                    }
                }
            }
            return this;
        };

        CharacterMatrixBuilder.prototype.removeStates = function (taxon, character) {
            var _this = this;
            Haeckel.ext.each(taxon.units, function (unit) {
                delete _this._hashMap[unit.hash + '@' + character.hash];
            });
            return this;
        };

        CharacterMatrixBuilder.prototype.removeTaxon = function (taxon) {
            if (taxon.empty) {
                return this;
            }
            var t = this._taxon;
            this._taxon = Haeckel.tax.setDiff(this._taxon, taxon);
            if (!Haeckel.equal(t, this._taxon)) {
                Haeckel.ext.each(taxon.units, function (unit) {
                    var h = unit.hash + '@', n = h.length, key;
                    for (key in this._hashMap) {
                        if (key.substr(0, n) === h) {
                            delete this._hashMap[key];
                        }
                    }
                }, this);
            }
            return this;
        };

        CharacterMatrixBuilder.prototype.reset = function () {
            this._characters.reset();
            this._characterList = [];
            this._hashMap = {};
            this._taxon = Haeckel.EMPTY_SET;
            return this;
        };

        CharacterMatrixBuilder.prototype.states = function (taxon, character, states) {
            if (typeof states === "undefined") { states = null; }
            if (states === null) {
                return Haeckel.chr.hashMapStates(this._hashMap, taxon, character);
            }
            this.add(character);
            var keyEnd = '@' + character.hash, map = this._hashMap;
            Haeckel.ext.each(taxon.units, function (unit) {
                var key = unit.hash + keyEnd, value = map[key];
                if (value !== undefined) {
                    states = character.combine([states, value]);
                }
                map[key] = states;
            }, this);
            this._taxon = Haeckel.tax.union([this._taxon, taxon]);
            return this;
        };
        return CharacterMatrixBuilder;
    })();
    Haeckel.CharacterMatrixBuilder = CharacterMatrixBuilder;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function Mash() {
        var n = 0xefc8249d;

        return function (data) {
            data = String(data);
            for (var i = 0; i < data.length; i++) {
                n += data.charCodeAt(i);
                var h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000;
            }
            return (n >>> 0) * 2.3283064365386963e-10;
        };
    }

    function seedRandom() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        var s0 = 0;
        var s1 = 0;
        var s2 = 0;
        var c = 1;

        if (!args || args.length === 0) {
            args = [+new Date];
        }
        var mash = Mash();
        s0 = mash(' ');
        s1 = mash(' ');
        s2 = mash(' ');

        for (var i = 0; i < args.length; i++) {
            s0 -= mash(args[i]);
            if (s0 < 0) {
                s0 += 1;
            }
            s1 -= mash(args[i]);
            if (s1 < 0) {
                s1 += 1;
            }
            s2 -= mash(args[i]);
            if (s2 < 0) {
                s2 += 1;
            }
        }
        mash = null;

        return function () {
            var t = 2091639 * s0 + c * 2.3283064365386963e-10;
            s0 = s1;
            s1 = s2;
            return s2 = t - (c = t | 0);
        };
    }
    Haeckel.seedRandom = seedRandom;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var GUID4_RANDOM = Haeckel.seedRandom("UUID", 4);

    function guid4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = GUID4_RANDOM() * 16 | 0;
            return ((c === 'x') ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    Haeckel.guid4 = guid4;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function createUnit() {
            var uid = Haeckel.guid4(), entity = {
                hash: uid,
                uid: uid
            };
            return Haeckel.tax.createUnitForEntity(Object.freeze(entity));
        }
        tax.createUnit = createUnit;
    })(Haeckel.tax || (Haeckel.tax = {}));
    var tax = Haeckel.tax;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var NomenclatureBuilder = (function () {
        function NomenclatureBuilder() {
            this._nameSets = new Haeckel.DAGBuilder();
            this._nameToNameSet = {};
        }
        NomenclatureBuilder.prototype.addName = function (name) {
            if (name.length === 0) {
                throw new Error("Empty name.");
            }
            if (this._nameToNameSet[name] === undefined) {
                var nameSet = Haeckel.ext.create([name]);
                this._nameSets.addVertex(nameSet);
                this._nameToNameSet[name] = nameSet;
            }
            return this;
        };

        NomenclatureBuilder.prototype.build = function () {
            var graph = this._nameSets.buildClosure(), solver = new Haeckel.DAGSolver(graph), sinks = solver.sinks, sinksToTaxa = {}, namesToTaxa = {}, namesBuilder = new Haeckel.ExtSetBuilder();
            Haeckel.ext.each(sinks, function (sink) {
                var taxon = Haeckel.tax.createUnit();
                sinksToTaxa[sink.hash] = taxon;
                Haeckel.ext.each(sink, function (name) {
                    namesBuilder.add(name);
                    namesToTaxa[name] = taxon;
                });
            });
            Haeckel.ext.each(Haeckel.ext.setDiff(graph.vertices, sinks), function (nonsink) {
                var sucSinks = Haeckel.ext.intersect(solver.imSucs(nonsink), sinks), taxon = Haeckel.EMPTY_SET;
                Haeckel.ext.each(sucSinks, function (sink) {
                    taxon = Haeckel.tax.union([taxon, sinksToTaxa[sink.hash]]);
                });
                Haeckel.ext.each(nonsink, function (name) {
                    namesBuilder.add(name);
                    namesToTaxa[name] = taxon;
                });
            });
            var taxaBuilder = new Haeckel.ExtSetBuilder();
            for (var key in namesToTaxa) {
                taxaBuilder.add(namesToTaxa[key]);
            }
            return Object.freeze({
                nameMap: Object.freeze(namesToTaxa),
                names: namesBuilder.build(),
                taxa: taxaBuilder.build()
            });
        };

        NomenclatureBuilder.prototype.hyponymize = function (hyperonym, hyponym) {
            this.addName(hyperonym).addName(hyponym)._nameSets.addArc(this._nameToNameSet[hyperonym], this._nameToNameSet[hyponym]);
            return this;
        };

        NomenclatureBuilder.prototype.reset = function () {
            this._nameSets.reset();
            this._nameToNameSet = {};
            return this;
        };

        NomenclatureBuilder.prototype.synonymize = function (nameA, nameB) {
            this.addName(nameA).addName(nameB);
            if (nameA === nameB) {
                return this;
            }
            var nameSetA = this._nameToNameSet[nameA], nameSetB = this._nameToNameSet[nameB];
            if (Haeckel.equal(nameSetA, nameSetB)) {
                return this;
            }
            var nameSets = this._nameSets, graph = nameSets.build(), solver = new Haeckel.DAGSolver(graph), nameSet = Haeckel.ext.union([nameSetA, nameSetB]), imPrcs = Haeckel.ext.union([solver.imPrcs(nameSetA), solver.imPrcs(nameSetB)]), imSucs = Haeckel.ext.union([solver.imSucs(nameSetA), solver.imSucs(nameSetB)]);
            nameSets.removeVertex(nameSetA).removeVertex(nameSetB).addVertex(nameSet);
            Haeckel.ext.each(imPrcs, function (prc) {
                nameSets.addArc(prc, nameSet);
            });
            Haeckel.ext.each(imSucs, function (suc) {
                nameSets.addArc(nameSet, suc);
            });
            for (var key in this._nameToNameSet) {
                var x = this._nameToNameSet[key];
                if (Haeckel.equal(x, nameSetA) || Haeckel.equal(x, nameSetB)) {
                    this._nameToNameSet[key] = nameSet;
                }
            }
            return this;
        };
        return NomenclatureBuilder;
    })();
    Haeckel.NomenclatureBuilder = NomenclatureBuilder;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.EMPTY_NOMENCLATURE = Object.freeze({
        nameMap: Object.freeze({}),
        names: Haeckel.EMPTY_SET,
        taxa: Haeckel.EMPTY_SET
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (nom) {
        function read(data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            if (builder === null) {
                builder = new Haeckel.NomenclatureBuilder();
            }
            for (var name in data) {
                builder.addName(name);
            }
            return builder;
        }
        nom.read = read;
    })(Haeckel.nom || (Haeckel.nom = {}));
    var nom = Haeckel.nom;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function byName(nomenclature, name) {
            return nomenclature.nameMap[name] || Haeckel.EMPTY_SET;
        }
        tax.byName = byName;
    })(Haeckel.tax || (Haeckel.tax = {}));
    var tax = Haeckel.tax;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var CharacterMapReader = (function () {
        function CharacterMapReader() {
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
            this.characterMap = function (key) {
                return null;
            };
        }
        CharacterMapReader.prototype.readCharacterMatrix = function (data, builder) {
            if (!builder) {
                builder = new Haeckel.CharacterMatrixBuilder();
            }
            var name;
            for (name in data) {
                var taxon = Haeckel.tax.byName(this.nomenclature, name);
                if (taxon && !taxon.empty) {
                    var scores = data[name], characterKey;
                    for (characterKey in scores) {
                        var character = this.characterMap(characterKey);
                        if (character) {
                            builder.states(taxon, character, character.readStates(scores[characterKey]));
                        }
                    }
                }
            }
            return builder;
        };

        CharacterMapReader.prototype.readNomenclature = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            return Haeckel.nom.read(data, builder);
        };
        return CharacterMapReader;
    })();
    Haeckel.CharacterMapReader = CharacterMapReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var TempNomenclature = (function () {
        function TempNomenclature(nomenclature) {
            if (typeof nomenclature === "undefined") { nomenclature = null; }
            this.warn = true;
            this._otherNameMap = {};
            this.nomenclature = (nomenclature === null) ? Haeckel.EMPTY_NOMENCLATURE : nomenclature;
        }
        TempNomenclature.prototype.taxon = function (name) {
            var taxon = this.nomenclature.nameMap[name];
            if (!taxon) {
                taxon = this._otherNameMap[name];
                if (!taxon) {
                    taxon = Haeckel.tax.createUnit();
                    this._otherNameMap[name] = taxon;
                    if (this.warn) {
                        console.warn("Unrecognized name: \"" + name + "\".");
                    }
                }
            }
            return taxon;
        };
        return TempNomenclature;
    })();
    Haeckel.TempNomenclature = TempNomenclature;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var RangeBuilder = (function () {
        function RangeBuilder() {
            this._max = NaN;
            this._min = NaN;
        }
        RangeBuilder.prototype.add = function (value) {
            if (!isNaN(value)) {
                if (isNaN(this._min) || value < this._min) {
                    this._min = value;
                }
                if (isNaN(this._max) || value > this._max) {
                    this._max = value;
                }
            }
            return this;
        };

        RangeBuilder.prototype.addRange = function (range) {
            if (!range.empty) {
                if (isNaN(this._min) || range.min < this._min) {
                    this._min = range.min;
                }
                if (isNaN(this._max) || range.max > this._max) {
                    this._max = range.max;
                }
            }
            return this;
        };

        RangeBuilder.prototype.build = function () {
            var max = this._max, min = this._min;
            if (isNaN(min) || isNaN(max)) {
                return Haeckel.EMPTY_SET;
            }
            return Haeckel.rng.create(min, max);
        };

        RangeBuilder.prototype.reset = function () {
            this._min = this._max = NaN;
            return this;
        };
        return RangeBuilder;
    })();
    Haeckel.RangeBuilder = RangeBuilder;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function createFromBits(bits) {
            if (bits === 0) {
                return Haeckel.EMPTY_SET;
            }
            return Object.freeze({
                bits: bits,
                empty: false,
                hash: "{bits:" + bits.toString(16) + "}"
            });
        }
        bit.createFromBits = createFromBits;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.BIT_MEMBER_MAX = 31;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function create(members) {
            var bits = 0;
            for (var i = 0, n = members.length; i < n; ++i) {
                var member = members[i];
                if (!isFinite(member) || member < 0 || member > Haeckel.BIT_MEMBER_MAX) {
                    throw new Error("Invalid member for bit set: " + member + ".");
                }
                bits |= (1 << (member | 0));
            }
            return Haeckel.bit.createFromBits(bits);
        }
        bit.create = create;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function read(data) {
            if (data === null || data === undefined) {
                return null;
            }
            if (Array.isArray(data)) {
                return Haeckel.bit.create(data);
            }
            var n = Number(data);
            if (n >= 0 && n <= Haeckel.BIT_MEMBER_MAX) {
                var bits = 1 << n;
                return Object.freeze({
                    bits: bits,
                    empty: false,
                    hash: "{bits:" + bits.toString(16) + "}"
                });
            }
            return null;
        }
        bit.read = read;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function combiner(union) {
        return function (sets) {
            var notNull = [];
            Haeckel.arr.each(sets, function (s) {
                if (s) {
                    notNull.push(s);
                }
            });
            return union(notNull);
        };
    }
    Haeckel.combiner = combiner;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (chr) {
        function initiate(domain) {
            if (domain.empty) {
                throw new Error("Can't have a character with an empty domain.");
            }
            var uid = Haeckel.guid4();
            return {
                combine: null,
                domain: domain,
                hash: uid,
                readStates: null,
                uid: uid,
                writeStates: null
            };
        }
        chr.initiate = initiate;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (chr) {
        function normalizeWeights(statesList) {
            var n = statesList.length;
            if (n === 0) {
                return statesList;
            }
            var i, total = 0, weightedStates, result = new Array(n);
            for (i = 0; i < n; ++i) {
                weightedStates = statesList[i];
                var weight = weightedStates.weight;
                if (isFinite(weight)) {
                    total += weight;
                }
                result[i] = { states: weightedStates.states, weight: weight };
            }
            var noWeights = total === 0 || !isFinite(weightedStates.weight);
            for (i = 0; i < n; ++i) {
                weightedStates = result[i];
                if (noWeights) {
                    weightedStates.weight = 0;
                } else {
                    weightedStates.weight /= total;
                }
                Object.freeze(weightedStates);
            }
            return Object.freeze(result);
        }
        chr.normalizeWeights = normalizeWeights;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function intersect(a, b) {
            return Haeckel.bit.createFromBits(a.bits & b.bits);
        }
        bit.intersect = intersect;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function size(s) {
            var size = 0;
            for (var i = 0; i <= Haeckel.BIT_MEMBER_MAX; ++i) {
                if (s.bits & (1 << i)) {
                    size++;
                }
            }
            return size;
        }
        bit.size = size;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function distance(a, b) {
            if (a === null || b === null) {
                return Haeckel.EMPTY_SET;
            }
            if (a.bits === b.bits) {
                return Haeckel.bit.size(a) === 1 ? Haeckel.RANGE_0 : Haeckel.RANGE_0_TO_1;
            }
            return Haeckel.bit.intersect(a, b).empty ? Haeckel.RANGE_1 : Haeckel.RANGE_0_TO_1;
        }
        bit.distance = distance;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function union(sets) {
            var n = sets.length;
            if (n === 0) {
                return null;
            }
            if (n === 1) {
                return sets[0];
            }
            var bits = 0;
            for (var i = 0; i < n; ++i) {
                bits |= sets[i].bits;
            }
            return Haeckel.bit.createFromBits(bits);
        }
        bit.union = union;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function write(set) {
            if (set === null || set === undefined) {
                return undefined;
            }
            var result = [];
            if (!set.empty) {
                for (var i = 0; i <= Haeckel.BIT_MEMBER_MAX; ++i) {
                    if (set.bits & (1 << i)) {
                        result.push(i);
                    }
                }
            }
            if (result.length === 1) {
                return result[0];
            }
            return result;
        }
        bit.write = write;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (chr) {
        function average(statesList) {
            var n = statesList.length;
            if (n === 0) {
                return null;
            }
            statesList = Haeckel.chr.normalizeWeights(statesList);
            var threshold = 1 / n, bits = 0;
            for (var i = 0; i < n; ++i) {
                var ws = statesList[i];
                if (ws.weight >= threshold && ws.states !== null) {
                    bits |= ws.states.bits;
                }
            }
            return Haeckel.bit.createFromBits(bits);
        }

        function createBit(domain, inferrable, distance) {
            var c = Haeckel.chr.initiate(domain);
            c.combine = Haeckel.combiner(Haeckel.bit.union);
            c.readStates = Haeckel.bit.read;
            c.writeStates = Haeckel.bit.write;
            if (distance) {
                c.distance = Haeckel.bit.distance;
            }
            if (inferrable) {
                c.inferrer = Object.freeze({ average: average });
            }
            return Object.freeze(c);
        }
        chr.createBit = createBit;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function read(data) {
            if (data === null || data === undefined) {
                return null;
            }
            if (typeof data === "number") {
                return Haeckel.rng.create(data);
            }
            if (Array.isArray(data)) {
                var builder = new Haeckel.RangeBuilder;
                Haeckel.arr.each(data, builder.add, builder);
                return builder.build();
            }
            return null;
        }
        rng.read = read;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var BitCharacterBuilder = (function () {
        function BitCharacterBuilder() {
            this.domainBits = 0;
        }
        BitCharacterBuilder.prototype.build = function () {
            return Haeckel.chr.createBit(Haeckel.bit.createFromBits(this.domainBits), true, true);
        };
        BitCharacterBuilder.prototype.readStates = function (data) {
            var states = Haeckel.bit.read(data);
            if (states !== null) {
                this.domainBits |= states.bits;
            }
        };
        BitCharacterBuilder.prototype.reset = function () {
            this.domainBits = 0;
            return this;
        };
        return BitCharacterBuilder;
    })();

    var RangeCharacterBuilder = (function () {
        function RangeCharacterBuilder() {
            this.domainBuilder = new Haeckel.RangeBuilder();
        }
        RangeCharacterBuilder.prototype.build = function () {
            return Haeckel.chr.createRange(this.domainBuilder.build(), true, true);
        };
        RangeCharacterBuilder.prototype.readStates = function (data) {
            var range = Haeckel.rng.read(data);
            if (range !== null) {
                this.domainBuilder.addRange(range);
            }
        };
        RangeCharacterBuilder.prototype.reset = function () {
            this.domainBuilder.reset();
            return this;
        };
        return RangeCharacterBuilder;
    })();

    function createCharacterBuilder(data) {
        if (data.characterType === "range") {
            return new RangeCharacterBuilder();
        }
        return new BitCharacterBuilder();
    }

    function readNumChars(data) {
        var num = NaN, name, scores = data.scores;
        for (name in scores) {
            if (isNaN(num)) {
                num = scores[name].length;
            } else if (num !== scores[name].length) {
                throw new Error("Inconsistent number of characters in matrix.");
            }
        }
        return isNaN(num) ? 0 : num;
    }

    function readCharacters(data, builder, numChars) {
        var characterBuilder = createCharacterBuilder(data);
        for (var i = 0; i < numChars; ++i) {
            characterBuilder.reset();
            for (var name in data.scores) {
                var row = data.scores[name];
                characterBuilder.readStates(row[i]);
            }
            builder.addListed(characterBuilder.build());
        }
        return builder.characterList;
    }

    var CharacterScoresReader = (function () {
        function CharacterScoresReader() {
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
        }
        CharacterScoresReader.prototype.readCharacterMatrix = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            var numChars = readNumChars(data);
            if (builder === null) {
                builder = new Haeckel.CharacterMatrixBuilder();
            }
            var characters = readCharacters(data, builder, numChars), nomenclature = new Haeckel.TempNomenclature(this.nomenclature);
            for (var name in data.scores) {
                var taxon = nomenclature.taxon(name), row = data.scores[name];
                for (var i = 0; i < numChars; ++i) {
                    var character = characters[i];
                    builder.states(taxon, character, character.readStates(row[i]));
                }
            }
            return builder;
        };

        CharacterScoresReader.prototype.readNomenclature = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            return Haeckel.nom.read(data.scores, builder);
        };
        return CharacterScoresReader;
    })();
    Haeckel.CharacterScoresReader = CharacterScoresReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    ;

    var DatingReader = (function () {
        function DatingReader() {
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
        }
        DatingReader.prototype.readDatings = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            var _this = this;
            if (!builder) {
                builder = new Haeckel.ExtSetBuilder();
            }
            var taxaBuilder = new Haeckel.ExtSetBuilder();
            Haeckel.arr.each(data, function (d) {
                taxaBuilder.reset();
                Haeckel.arr.each(d.taxa, function (name) {
                    var taxon = _this.nomenclature.nameMap[name];
                    if (!taxon || taxon.empty) {
                        throw new Error('Unrecognized name: \"' + name + '\".');
                    }
                    taxaBuilder.add(taxon);
                }, _this);
                var taxa = taxaBuilder.build(), time = Haeckel.rng.read(d.time);
                builder.add(Object.freeze({
                    taxa: taxa,
                    time: time,
                    hash: taxa.hash + '@' + time.hash
                }));
            }, this);
            return builder;
        };

        DatingReader.prototype.readNomenclature = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            if (!builder) {
                builder = new Haeckel.NomenclatureBuilder();
            }
            Haeckel.arr.each(data, function (d) {
                Haeckel.arr.each(d.taxa, function (name) {
                    builder.addName(name);
                });
            });
            return builder;
        };
        return DatingReader;
    })();
    Haeckel.DatingReader = DatingReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DistanceMatrixReader = (function () {
        function DistanceMatrixReader() {
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
        }
        DistanceMatrixReader.prototype.readDistanceMatrix = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            if (builder === null) {
                builder = new Haeckel.DistanceMatrixBuilder();
            }
            for (var i = 0, n = data.length; i < n; ++i) {
                var names = data[i].names, m = names.length;
                if (!(m >= 1)) {
                    continue;
                }
                var distance = Haeckel.rng.read(data[i].distance), j = 0, taxa = new Array(m);
                while (j < m) {
                    taxa[j] = this.nomenclature.nameMap[names[j++]];
                }
                if (m === 1) {
                    builder.addRange(taxa[0], taxa[0], distance);
                } else {
                    for (j = 0; j < m - 1; ++j) {
                        var taxonA = taxa[j];
                        if (!taxonA.empty) {
                            for (var k = j + 1; k < m; ++k) {
                                var taxonB = taxa[k];
                                if (!taxonB.empty) {
                                    builder.addRange(taxonA, taxonB, distance);
                                }
                            }
                        }
                    }
                }
            }
            return builder;
        };

        DistanceMatrixReader.prototype.readNomenclature = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            if (builder === null) {
                builder = new Haeckel.NomenclatureBuilder();
            }
            for (var i = 0, n = data.length; i < n; ++i) {
                var names = data[i].names;
                for (var j = 0, m = names.length; j < m; ++j) {
                    builder.addName(names[j]);
                }
            }
            return builder;
        };
        return DistanceMatrixReader;
    })();
    Haeckel.DistanceMatrixReader = DistanceMatrixReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var NomenclatureRelationsReader = (function () {
        function NomenclatureRelationsReader() {
        }
        NomenclatureRelationsReader.prototype.readNomenclature = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            if (builder === null) {
                builder = new Haeckel.NomenclatureBuilder();
            }
            var i, n;
            if (data.hyponymies) {
                for (i = 0, n = data.hyponymies.length; i < n; ++i) {
                    var hyponymy = data.hyponymies[i];
                    builder.hyponymize(hyponymy[0], hyponymy[1]);
                }
            }
            if (data.synonymies) {
                for (i = 0, n = data.synonymies.length; i < n; ++i) {
                    var synonymy = data.synonymies[i], m = synonymy.length;
                    if (m > 0) {
                        var synonym = synonymy[0];
                        builder.addName(synonym);
                        for (var j = 1; j < m; ++j) {
                            builder.synonymize(synonym, synonymy[j]);
                        }
                    }
                }
            }
            return builder;
        };
        return NomenclatureRelationsReader;
    })();
    Haeckel.NomenclatureRelationsReader = NomenclatureRelationsReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function combine(ranges) {
            var min = NaN, max = NaN, n = ranges.length;
            for (var i = 0; i < n; ++i) {
                var r = ranges[i];
                if (!r) {
                    continue;
                }
                if (isNaN(min) || r.min < min) {
                    min = r.min;
                }
                if (isNaN(max) || r.max > max) {
                    max = r.max;
                }
            }
            if (isNaN(min)) {
                return null;
            }
            return Haeckel.rng.create(min, max);
        }
        rng.combine = combine;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function overlap(a, b) {
            return !a.empty && !b.empty && !(b.min > a.max || b.max < a.min);
        }
        rng.overlap = overlap;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function distance(a, b) {
            if (a === null || b === null) {
                return Haeckel.EMPTY_SET;
            }
            if (a.empty || b.empty) {
                return Haeckel.EMPTY_SET;
            }
            if (Haeckel.equal(a, b)) {
                return Haeckel.rng.create(0, a.size);
            }
            var minToMax = Math.abs(a.min - b.max), maxToMin = Math.abs(a.max - b.min);
            if (Haeckel.rng.overlap(a, b)) {
                return Haeckel.rng.create(0, Math.max(maxToMin, minToMax));
            }
            return Haeckel.rng.create(Math.min(maxToMin, minToMax), Math.max(maxToMin, minToMax));
        }
        rng.distance = distance;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function multiply(r, factor) {
            if (!isFinite(factor)) {
                throw new Error("Not a finite number: " + factor + ".");
            }
            if (r.empty) {
                return Haeckel.EMPTY_SET;
            }
            if (factor < 0) {
                return Haeckel.rng.create(r.max * factor, r.min * factor);
            }
            return Haeckel.rng.create(r.min * factor, r.max * factor);
        }
        rng.multiply = multiply;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function write(r) {
            if (r === null || r === undefined) {
                return undefined;
            }
            if (r.empty) {
                return [];
            }
            if (r.size === 0) {
                return r.min;
            }
            return [r.min, r.max];
        }
        rng.write = write;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (chr) {
        function average(statesList) {
            var n = statesList.length;
            if (n === 0) {
                return null;
            }
            statesList = Haeckel.chr.normalizeWeights(statesList);
            var min = 0, max = 0, total = 0;
            for (var i = 0; i < n; ++i) {
                var ws = statesList[i], r = ws.states, weight = ws.weight;
                if (r && weight !== 0) {
                    min += r.min * weight;
                    max += r.max * weight;
                    total += weight;
                }
            }
            if (total === 0) {
                return null;
            }
            return Haeckel.rng.create(min / total, max / total);
        }

        function createRange(domain, inferrable, distance) {
            var c = Haeckel.chr.initiate(domain);
            c.combine = Haeckel.rng.combine;
            c.readStates = Haeckel.rng.read;
            c.writeStates = Haeckel.rng.write;
            if (distance) {
                var ratio = 1 / domain.size;
                c.distance = function (a, b) {
                    if (!a || !b || a.empty || b.empty) {
                        return Haeckel.RANGE_0_TO_1;
                    }
                    return Haeckel.rng.multiply(Haeckel.rng.distance(a, b), ratio);
                };
            }
            if (inferrable) {
                c.inferrer = Object.freeze({ average: average });
            }
            return Object.freeze(c);
        }
        chr.createRange = createRange;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.COUNT_CHARACTER = Haeckel.chr.createRange(Haeckel.RANGE_POS_INF, false, false);
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function domain(hash) {
            return Object.freeze({
                empty: false,
                hash: hash,
                hashMap: Object.freeze({}),
                size: Infinity
            });
        }
        ext.domain = domain;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (chr) {
        function createDomain(hash, readStates, writeStates) {
            var c = Haeckel.chr.initiate(Haeckel.ext.domain(hash));
            c.combine = Haeckel.ext.union;
            c.readStates = readStates;
            c.writeStates = writeStates;
            return Object.freeze(c);
        }
        chr.createDomain = createDomain;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isGeoCoords(o) {
        return Haeckel.isModel(o) && typeof (o.lat) === "number" && typeof (o.lon) === "number";
    }
    Haeckel.isGeoCoords = isGeoCoords;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (geo) {
        function createCoords(lat, lon) {
            if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90) {
                throw new Error("Invalid coordinates: " + String(lat) + ", " + String(lon) + ".");
            }
            while (lon <= -180) {
                lon += 360;
            }
            while (lon > 180) {
                lon -= 360;
            }
            return Object.freeze({
                hash: "(geo:" + lat + ":" + lon + ")",
                lat: lat,
                lon: lon
            });
        }
        geo.createCoords = createCoords;
    })(Haeckel.geo || (Haeckel.geo = {}));
    var geo = Haeckel.geo;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (geo) {
        function readCoords(data) {
            if (data.length >= 2) {
                return Haeckel.geo.createCoords(data[0], data[1]);
            }
            return null;
        }
        geo.readCoords = readCoords;
    })(Haeckel.geo || (Haeckel.geo = {}));
    var geo = Haeckel.geo;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (geo) {
        function readRegion(data) {
            var region = [];
            for (var i = 0, n = data.length; i < n; ++i) {
                var coords = Haeckel.geo.readCoords(data[i]);
                if (coords !== null) {
                    region.push(coords);
                }
            }
            return region;
        }
        geo.readRegion = readRegion;
    })(Haeckel.geo || (Haeckel.geo = {}));
    var geo = Haeckel.geo;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (geo) {
        function readRegions(data) {
            var builder = new Haeckel.ExtSetBuilder(), regionName, region;
            if (Array.isArray(data)) {
                for (var i = 0, n = data.length; i < n; ++i) {
                    region = Haeckel.geo.readRegion(data[i]);
                    if (region.length > 0) {
                        builder.add(region);
                    }
                }
            } else {
                for (regionName in data) {
                    region = Haeckel.geo.readRegion(data[regionName]);
                    if (region.length > 0) {
                        builder.add(region);
                    }
                }
            }
            return builder.build();
        }
        geo.readRegions = readRegions;
    })(Haeckel.geo || (Haeckel.geo = {}));
    var geo = Haeckel.geo;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.GEO_CHARACTER = Haeckel.chr.createDomain('{GeoCoords}', Haeckel.geo.readRegions);
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isOccurrence(o) {
        return Haeckel.isModel(o) && Haeckel.isRange(o.count) && Haeckel.isExtSet(o.geo) && Haeckel.isRange(o.time);
    }
    Haeckel.isOccurrence = isOccurrence;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (occ) {
        function create(count, geo, time) {
            if (typeof count === "undefined") { count = null; }
            if (typeof geo === "undefined") { geo = null; }
            if (typeof time === "undefined") { time = null; }
            var occurrence = {
                count: count ? count : Haeckel.EMPTY_SET,
                geo: geo ? geo : Haeckel.EMPTY_SET,
                hash: null,
                time: time ? time : Haeckel.EMPTY_SET
            };
            occurrence.hash = "(occurrence:" + occurrence.count.hash + ":" + occurrence.geo.hash + ":" + occurrence.time.hash + ")";
            return Object.freeze(occurrence);
        }
        occ.create = create;
    })(Haeckel.occ || (Haeckel.occ = {}));
    var occ = Haeckel.occ;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (occ) {
        function read(data) {
            if (data === null) {
                return null;
            }
            return Haeckel.occ.create(Haeckel.rng.read(data.count), Haeckel.geo.readRegions(data.geo), Haeckel.rng.read(data.time));
        }
        occ.read = read;
    })(Haeckel.occ || (Haeckel.occ = {}));
    var occ = Haeckel.occ;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (occ) {
        function readOccurrences(data) {
            var builder = new Haeckel.ExtSetBuilder(), occurrence;
            if (Array.isArray(data)) {
                for (var i = 0, n = data.length; i < n; ++i) {
                    occurrence = Haeckel.occ.read(data[i]);
                    if (occurrence !== null) {
                        builder.add(occurrence);
                    }
                }
            } else if (typeof data === "object") {
                for (var k in data) {
                    occurrence = Haeckel.occ.read(data[k]);
                    if (occurrence !== null) {
                        builder.add(occurrence);
                    }
                }
            }
            return builder.build();
        }
        occ.readOccurrences = readOccurrences;
    })(Haeckel.occ || (Haeckel.occ = {}));
    var occ = Haeckel.occ;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.OCCURRENCE_CHARACTER = Haeckel.chr.createDomain('{Occurrence}', Haeckel.occ.readOccurrences);
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.TIME_CHARACTER = Haeckel.chr.createRange(Haeckel.RANGE_NEG_INF, true, true);
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    ;

    var OccurrencesReader = (function () {
        function OccurrencesReader() {
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
        }
        OccurrencesReader.prototype.readCharacterMatrix = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            if (builder === null) {
                builder = new Haeckel.CharacterMatrixBuilder();
            }
            var nonUnitNames = [];
            for (var name in data) {
                var taxon = Haeckel.tax.byName(this.nomenclature, name);
                if (taxon !== null && !taxon.empty) {
                    if (!taxon.isUnit) {
                        nonUnitNames.push(name);
                    } else {
                        var states = Haeckel.OCCURRENCE_CHARACTER.readStates(data[name]);
                        if (states !== null) {
                            Haeckel.ext.each(states, function (occurrence) {
                                builder.states(taxon, Haeckel.COUNT_CHARACTER, occurrence.count);
                                builder.states(taxon, Haeckel.GEO_CHARACTER, occurrence.geo);
                                builder.states(taxon, Haeckel.TIME_CHARACTER, occurrence.time);
                            });
                            builder.states(taxon, Haeckel.OCCURRENCE_CHARACTER, states);
                        }
                    }
                }
            }
            var n = nonUnitNames.length;
            if (n > 0) {
                var message = "Occurrence data can only be scored for taxonomic units. The ";
                if (n === 1) {
                    message += 'taxon named "' + nonUnitNames[0] + '" is not a unit.';
                } else {
                    message += 'taxa named "' + nonUnitNames.slice(0, n - 1).join('", "') + '" and "' + nonUnitNames[n - 1] + '" are not units.';
                }
                throw new Error(message);
            }
            return builder;
        };

        OccurrencesReader.prototype.readNomenclature = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            return Haeckel.nom.read(data, builder);
        };
        return OccurrencesReader;
    })();
    Haeckel.OccurrencesReader = OccurrencesReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var PhyloArcsReader = (function () {
        function PhyloArcsReader() {
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
        }
        PhyloArcsReader.prototype.readDAG = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            if (builder === null) {
                builder = new Haeckel.DAGBuilder();
            }
            var nomenclature = new Haeckel.TempNomenclature(this.nomenclature);
            for (var i = 0, n = data.length; i < n; ++i) {
                var arc = data[i], prc = nomenclature.taxon(arc[0]), suc = nomenclature.taxon(arc[1]);
                builder.addArc(prc, suc);
            }
            return builder;
        };

        PhyloArcsReader.prototype.readNomenclature = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            if (builder === null) {
                builder = new Haeckel.NomenclatureBuilder();
            }
            for (var i = 0, n = data.length; i < n; ++i) {
                var arc = data[i];
                builder.addName(arc[0]);
                builder.addName(arc[1]);
            }
            return builder;
        };
        return PhyloArcsReader;
    })();
    Haeckel.PhyloArcsReader = PhyloArcsReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var StratReader = (function () {
        function StratReader() {
            this._boundaries = {};
        }
        StratReader.prototype.readStrata = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            for (var id in data.boundaries) {
                var range = Haeckel.rng.read(data.boundaries[id]);
                this._boundaries[id] = range;
            }
            if (builder === null) {
                builder = new Haeckel.ExtSetBuilder();
            }
            for (var name in data.units) {
                var datum = data.units[name], type = datum.type, start = null, end = null;
                for (var i = 0, n = datum.boundaries.length; i < n; ++i) {
                    var boundary = this._boundaries[datum.boundaries[i]];
                    if (boundary === undefined) {
                        throw new Error("Invalid boundary ID: \"" + String(datum.boundaries[i]) + "\".");
                    }
                    if (start === null || start.mean > boundary.mean) {
                        start = boundary;
                    }
                    if (end === null || end.mean < boundary.mean) {
                        end = boundary;
                    }
                }
                if (start === null || end === null || start.hash === end.hash) {
                    throw new Error("Invalid boundaries for stratum \"" + name + "\".");
                }
                builder.add(Object.freeze({
                    end: end,
                    hash: '(stratum:' + type + ":" + name + ")",
                    name: name,
                    start: start,
                    type: type
                }));
            }
            return builder;
        };
        return StratReader;
    })();
    Haeckel.StratReader = StratReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var TopologyReader = (function () {
        function TopologyReader() {
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
        }
        TopologyReader.prototype.readDAG = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            function readNode(node) {
                var taxon = Haeckel.EMPTY_SET;
                if (typeof node === "string") {
                    taxon = nomenclature.taxon(node);
                    builder.addVertex(taxon);
                }
                if (Array.isArray(node)) {
                    taxon = Haeckel.tax.createUnit();
                    builder.addVertex(taxon);
                    for (var i = 0, n = node.length; i < n; ++i) {
                        var child = readNode(node[i]);
                        if (!child.empty) {
                            builder.addArc(taxon, child);
                        }
                    }
                }
                return taxon;
            }

            if (builder === null) {
                builder = new Haeckel.DAGBuilder();
            }
            var nomenclature = new Haeckel.TempNomenclature(this.nomenclature);
            readNode(data);
            return builder;
        };

        TopologyReader.prototype.readNomenclature = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            function readNode(node) {
                if (typeof node === "string") {
                    builder.addName(node);
                } else if (Array.isArray(node)) {
                    for (var i = 0, n = node.length; i < n; ++i) {
                        readNode(node[i]);
                    }
                }
            }

            if (builder === null) {
                builder = new Haeckel.NomenclatureBuilder();
            }
            readNode(data);
            return builder;
        };
        return TopologyReader;
    })();
    Haeckel.TopologyReader = TopologyReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.EMPTY_CHARACTER_MATRIX = Object.freeze({
        characters: Haeckel.EMPTY_SET,
        characterList: Object.freeze([]),
        hashMap: Object.freeze({}),
        taxon: Haeckel.EMPTY_SET
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DataSourceReader = (function () {
        function DataSourceReader() {
            this._nomenclature = Haeckel.EMPTY_NOMENCLATURE;
            this.characterMapReader = new Haeckel.CharacterMapReader();
            this.characterScoresReader = new Haeckel.CharacterScoresReader();
            this.datingReader = new Haeckel.DatingReader();
            this.distanceMatrixReader = new Haeckel.DistanceMatrixReader();
            this.nomenclatureRelationsReader = new Haeckel.NomenclatureRelationsReader();
            this.occurrencesReader = new Haeckel.OccurrencesReader();
            this.phyloArcsReader = new Haeckel.PhyloArcsReader();
            this.stratReader = new Haeckel.StratReader();
            this.topologyReader = new Haeckel.TopologyReader();
        }
        Object.defineProperty(DataSourceReader.prototype, "nomenclature", {
            set: function (value) {
                if (!Haeckel.isNomenclature(value)) {
                    value = Haeckel.EMPTY_NOMENCLATURE;
                }
                if (this._nomenclature !== value) {
                    this._nomenclature = value;
                    this.characterMapReader.nomenclature = value;
                    this.characterScoresReader.nomenclature = value;
                    this.datingReader.nomenclature = value;
                    this.distanceMatrixReader.nomenclature = value;
                    this.occurrencesReader.nomenclature = value;
                    this.phyloArcsReader.nomenclature = value;
                    this.topologyReader.nomenclature = value;
                }
            },
            enumerable: true,
            configurable: true
        });

        DataSourceReader.prototype.readDataSource = function (data) {
            var result = {
                characterMatrices: {},
                datings: {},
                distanceMatrices: {},
                metadata: Object.freeze(data.metadata),
                nomenclature: this._nomenclature,
                occurrences: Haeckel.EMPTY_CHARACTER_MATRIX,
                phylogenies: {},
                strata: Haeckel.EMPTY_SET
            }, key, d = data.data;
            if (d.characterMaps !== undefined) {
                for (key in d.characterMaps) {
                    result.characterMatrices[key] = this.characterMapReader.readCharacterMatrix(d.characterMaps[key]).build();
                }
            }
            if (d.characterScores !== undefined) {
                for (key in d.characterScores) {
                    result.characterMatrices[key] = this.characterScoresReader.readCharacterMatrix(d.characterScores[key]).build();
                }
            }
            if (d.datings !== undefined) {
                for (key in d.distances) {
                    result.datings[key] = this.datingReader.readDatings(d.datings[key]).build();
                }
            }
            if (d.distances !== undefined) {
                for (key in d.distances) {
                    result.distanceMatrices[key] = this.distanceMatrixReader.readDistanceMatrix(d.distances[key]).build();
                }
            }
            if (d.occurrences !== undefined) {
                result.occurrences = this.occurrencesReader.readCharacterMatrix(d.occurrences).build();
            }
            if (d.phyloGraphs !== undefined) {
                for (key in d.phyloGraphs) {
                    result.phylogenies[key] = this.phyloArcsReader.readDAG(d.phyloGraphs[key]).build();
                }
            }
            if (d.stratigraphy !== undefined) {
                result.strata = this.stratReader.readStrata(d.stratigraphy).build();
            }
            if (d.topologies !== undefined) {
                for (key in d.topologies) {
                    result.phylogenies[key] = this.topologyReader.readDAG(d.topologies[key]).build();
                }
            }
            result.characterMatrices = Object.freeze(result.characterMatrices);
            result.distanceMatrices = Object.freeze(result.distanceMatrices);
            result.phylogenies = Object.freeze(result.phylogenies);
            return Object.freeze(result);
        };

        DataSourceReader.prototype.readNomenclature = function (data, builder) {
            if (typeof builder === "undefined") { builder = null; }
            if (builder === null) {
                builder = new Haeckel.NomenclatureBuilder();
            }
            var key, d = data.data;
            if (d.characterMaps !== undefined) {
                for (key in d.characterMaps) {
                    this.characterMapReader.readNomenclature(d.characterMaps[key], builder);
                }
            }
            if (d.characterScores !== undefined) {
                for (key in d.characterScores) {
                    this.characterScoresReader.readNomenclature(d.characterScores[key], builder);
                }
            }
            if (d.datings !== undefined) {
                for (key in d.datings) {
                    this.datingReader.readNomenclature(d.datings[key], builder);
                }
            }
            if (d.distances !== undefined) {
                for (key in d.distances) {
                    this.distanceMatrixReader.readNomenclature(d.distances[key], builder);
                }
            }
            if (d.occurrences !== undefined) {
                this.occurrencesReader.readNomenclature(d.occurrences, builder);
            }
            if (d.nomenclature !== undefined) {
                this.nomenclatureRelationsReader.readNomenclature(d.nomenclature, builder);
            }
            if (d.phyloGraphs !== undefined) {
                for (key in d.phyloGraphs) {
                    this.phyloArcsReader.readNomenclature(d.phyloGraphs[key], builder);
                }
            }
            if (d.topologies !== undefined) {
                for (key in d.topologies) {
                    this.topologyReader.readNomenclature(d.topologies[key], builder);
                }
            }
            return builder;
        };
        return DataSourceReader;
    })();
    Haeckel.DataSourceReader = DataSourceReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DataSourcesReader = (function () {
        function DataSourcesReader() {
        }
        DataSourcesReader.prototype.read = function (files, filenames) {
            var data = {}, filename;
            if (!filenames) {
                filenames = [];
            }
            for (var i = 0, n = filenames.length; i < n; ++i) {
                filename = filenames[i];
                if (data[filename] === undefined) {
                    data[filename] = JSON.parse(files.text[filename]);
                }
            }
            var reader = new Haeckel.DataSourceReader, nomenclatureBuilder = new Haeckel.NomenclatureBuilder;
            for (filename in data) {
                reader.readNomenclature(data[filename], nomenclatureBuilder);
            }
            var sources = {
                nomenclature: reader.nomenclature = nomenclatureBuilder.build(),
                sources: {}
            };
            for (filename in data) {
                sources.sources[filename] = reader.readDataSource(data[filename]);
            }
            return sources;
        };
        return DataSourcesReader;
    })();
    Haeckel.DataSourcesReader = DataSourcesReader;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function render(figure, document, files, serializer) {
        var dataSourcesReader = new Haeckel.DataSourcesReader(), dataSources = dataSourcesReader.read(files, figure.sources), i, n, assetData = {}, filename, elementBuilder = new Haeckel.ElementBuilder(document, Haeckel.SVG_NS, 'svg').attrs({
            xmlns: Haeckel.SVG_NS,
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
        }).attrs(Haeckel.SVG_NS, {
            width: figure.width,
            height: figure.height
        });
        if (figure.assets) {
            if (figure.assets.base64) {
                for (i = 0, n = figure.assets.base64.length; i < n; ++i) {
                    filename = figure.assets.base64[i];
                    assetData[filename] = files.base64[filename];
                }
            }
            if (figure.assets.text) {
                for (i = 0, n = figure.assets.text.length; i < n; ++i) {
                    filename = figure.assets.text[i];
                    assetData[filename] = files.text[filename];
                }
            }
        }
        figure.render(elementBuilder, dataSources, assetData);
        var svg = elementBuilder.build();
        document.body.appendChild(svg);
        return '<?xml version="1.0" encoding="UTF-8"?>' + serializer.serializeToString(svg);
    }
    Haeckel.render = render;
})(Haeckel || (Haeckel = {}));

var HTML = '<!DOCTYPE HTML><html><head><title>&nbsp;</title></head><body></body></html>';

function dataURI(data, mimetype, base64, charset) {
    if (typeof mimetype === "undefined") { mimetype = 'text/javascript'; }
    if (typeof base64 === "undefined") { base64 = false; }
    if (typeof charset === "undefined") { charset = 'utf-8'; }
    return 'data:' + mimetype + ';charset=' + charset + (base64 ? ';base64' : '') + ',' + data;
}

var system = require('system');
try  {
    if (system.args.length !== 3 || !/\.js$/.test(system.args[1])) {
        throw new Error('Correct usage: phantomjs phantom.js <figure.js> <output_folder>');
    }
    var inputFile = system.args[1], outputFolder = system.args[2], split = inputFile.split(/[\/\\]/g), baseFilename = split[split.length - 1].replace(/(\.fig)?\.js$/, ''), outputFilename = outputFolder.replace(/\/$/, '') + '/' + baseFilename;
    fs = require('fs');
    if (!fs.isFile(inputFile)) {
        throw new Error("Cannot find input file \"" + inputFile + "\".");
    }
    if (!fs.isDirectory(outputFolder)) {
        throw new Error("Cannot find output folder \"" + outputFolder + "\".");
    }
    if (!phantom.injectJs(inputFile)) {
        throw new Error("Error reading \"" + inputFile + "\".");
    }
    if (!FIGURE_TO_RENDER) {
        throw new Error("\"" + inputFile + "\" must define a variable called \"FIGURE_TO_RENDER\".");
    }
    var files = {
        base64: {},
        text: {}
    };
    if ((FIGURE_TO_RENDER.sources && FIGURE_TO_RENDER.sources.length) || (FIGURE_TO_RENDER.assets && ((FIGURE_TO_RENDER.assets.base64 && FIGURE_TO_RENDER.assets.base64.length) || (FIGURE_TO_RENDER.assets.text && FIGURE_TO_RENDER.assets.text.length)))) {
        var i, n, filename, fs = require('fs'), read = fs.read;
        if (FIGURE_TO_RENDER.assets) {
            if (FIGURE_TO_RENDER.assets.text) {
                for (i = 0, n = FIGURE_TO_RENDER.assets.text.length; i < n; ++i) {
                    filename = FIGURE_TO_RENDER.assets.text[i];
                    files.text[filename] = read(filename, { charset: 'utf-8' });
                }
            }
            if (FIGURE_TO_RENDER.assets.base64) {
                for (i = 0, n = FIGURE_TO_RENDER.assets.base64.length; i < n; ++i) {
                    filename = FIGURE_TO_RENDER.assets.base64[i];
                    files.base64[filename] = read(filename, { mode: 'rb' });

                    console.log(files.base64[filename]);
                }
            }
        }
        if (FIGURE_TO_RENDER.sources) {
            for (i = 0, n = FIGURE_TO_RENDER.sources.length; i < n; ++i) {
                filename = FIGURE_TO_RENDER.sources[i];
                files.text[filename] = read(filename, { charset: 'utf-8' });
            }
        }
    }
    var page = require('webpage').create();
} catch (e) {
    console.error(e);
    phantom.exit(1);
}
page.open(dataURI(HTML, 'text/html'), function (status) {
    try  {
        if (status !== 'success') {
            throw new Error('Error reading HTML.');
        } else if (!page.injectJs('haeckel.js')) {
            throw new Error('Cannot find "haeckel.js".');
        } else if (!page.injectJs(inputFile)) {
            throw new Error('Cannot find \"" + inputFile + "\".');
        } else {
            var svgData = page.evaluate(function (cache) {
                return Haeckel.render(FIGURE_TO_RENDER, document, cache, new XMLSerializer);
            }, files);
            fs.write(outputFilename + '.svg', svgData, 'w');
            page.render(outputFilename + '.png');
        }
    } catch (e) {
        console.error(e);
        phantom.exit(1);
        return;
    }
    phantom.exit(0);
});
