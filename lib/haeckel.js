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
    function isRange(o) {
        return Haeckel.isSet(o) && typeof o.max === "number" && typeof o.min === "number" && typeof o.mean === "number" && typeof o.size === "number";
    }
    Haeckel.isRange = isRange;
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
    function isEntity(o) {
        return Haeckel.isModel(o) && typeof o.uid === "string";
    }
    Haeckel.isEntity = isEntity;
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
    function isCharacterMatrix(o) {
        return typeof o === "object" && Haeckel.isExtSet(o.characters) && Array.isArray(o.characterList) && typeof o.hashMap === "object" && Haeckel.isTaxic(o.taxon);
    }
    Haeckel.isCharacterMatrix = isCharacterMatrix;
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
    function isDistanceMatrix(o) {
        return typeof o === "object" && typeof o.hashMap === "object" && Haeckel.isExtSet(o.members);
    }
    Haeckel.isDistanceMatrix = isDistanceMatrix;
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
    function isWeightedStates(o) {
        return typeof o === "object" && (o.states === null || Haeckel.isSet(o.states)) && typeof o.weight === "number";
    }
    Haeckel.isWeightedStates = isWeightedStates;
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
    Haeckel.BLACK = Object.freeze({
        b: 0,
        error: false,
        g: 0,
        hex: '#000000',
        r: 0
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.RAD_TO_DEG = 180 / Math.PI;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.TAU = Math.PI * 2;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (trg) {
        function normalize(radians) {
            if (!isFinite(radians)) {
                return 0;
            }
            while (radians < 0) {
                radians += Haeckel.TAU;
            }
            while (radians >= Haeckel.TAU) {
                radians -= Haeckel.TAU;
            }
            return radians;
        }
        trg.normalize = normalize;
    })(Haeckel.trg || (Haeckel.trg = {}));
    var trg = Haeckel.trg;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function compareGradientEntries(a, b) {
        return a.ratio - b.ratio;
    }

    function gradientEntryToString(entry) {
        return entry.color.hex + ":" + (entry.ratio * 100);
    }

    var LinearGradientBuilder = (function () {
        function LinearGradientBuilder() {
            this.angle = 0;
            this.end = Haeckel.BLACK;
            this.start = Haeckel.BLACK;
            this._tweens = [];
        }
        LinearGradientBuilder.prototype.add = function (entry) {
            if (entry.ratio <= 0 || isNaN(entry.ratio)) {
                this.start = entry.color;
            } else if (entry.ratio >= 1) {
                this.end = entry.color;
            } else {
                this._tweens.push(entry);
            }
            return this;
        };

        LinearGradientBuilder.prototype.build = function () {
            this._tweens = this._tweens.sort(compareGradientEntries);
            var s = String(Haeckel.trg.normalize(this.angle) * Haeckel.RAD_TO_DEG) + "-" + this.start.hex;
            for (var i = 0, n = this._tweens.length; i < n; ++i) {
                s += "-" + gradientEntryToString(this._tweens[i]);
            }
            s += "-" + this.end.hex;
            return s;
        };

        LinearGradientBuilder.prototype.reset = function () {
            this.angle = 0;
            this.end = Haeckel.BLACK;
            this.start = Haeckel.BLACK;
            this._tweens = [];
            return this;
        };

        LinearGradientBuilder.prototype.resetEntries = function () {
            this._tweens = [];
            return this;
        };
        return LinearGradientBuilder;
    })();
    Haeckel.LinearGradientBuilder = LinearGradientBuilder;
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
    var PathBuilder = (function () {
        function PathBuilder() {
            this.points = [];
        }
        PathBuilder.prototype.add = function (point) {
            this.points.push(point);
            return this;
        };

        PathBuilder.prototype.build = function () {
            var n = this.points.length;
            if (n === 0) {
                return 'M0,0Z';
            }

            return 'M' + this.points.map(function (point) {
                return String(point.x) + ' ' + point.y;
            }).join('L') + 'Z';
        };

        PathBuilder.prototype.reset = function () {
            this.points = [];
            return this;
        };
        return PathBuilder;
    })();
    Haeckel.PathBuilder = PathBuilder;
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
    (function (ext) {
        function singleMember(set) {
            if (set.size !== 1) {
                throw new Error("Not a singleton: {" + Haeckel.ext.list(set).join(", ") + "}");
            }
            for (var h in set.hashMap) {
                return set.hashMap[h];
            }
            return null;
        }
        ext.singleMember = singleMember;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var TaxonBuilder = (function () {
        function TaxonBuilder() {
            this._entitiesBuilder = new Haeckel.ExtSetBuilder();
            this._unitsBuilder = new Haeckel.ExtSetBuilder();
        }
        TaxonBuilder.prototype.add = function (taxon) {
            this._entitiesBuilder.addSet(taxon.entities);
            this._unitsBuilder.addSet(taxon.units);
            return this;
        };

        TaxonBuilder.prototype.addSet = function (taxa) {
            var _this = this;
            Haeckel.ext.each(taxa, function (taxon) {
                _this._entitiesBuilder.addSet(taxon.entities);
                _this._unitsBuilder.addSet(taxon.units);
            }, this);
            return this;
        };

        TaxonBuilder.prototype.build = function () {
            var units = this._unitsBuilder.build();
            if (units.empty) {
                return Haeckel.EMPTY_SET;
            }
            if (units.size === 1) {
                return Haeckel.ext.singleMember(units);
            }
            var entities = this._entitiesBuilder.build(), n = entities.size, uids = new Array(n), i = 0;
            Haeckel.ext.each(entities, function (entity) {
                uids[i++] = entity.uid;
            });
            uids = uids.sort();
            return Object.freeze({
                empty: false,
                entities: entities,
                hash: '(' + uids.join('|') + ')',
                isUnit: false,
                units: units
            });
        };

        TaxonBuilder.prototype.remove = function (taxon) {
            this._entitiesBuilder.removeSet(taxon.entities);
            this._unitsBuilder.removeSet(taxon.units);
            return this;
        };

        TaxonBuilder.prototype.removeSet = function (taxa) {
            var _this = this;
            Haeckel.ext.each(taxa, function (taxon) {
                _this._entitiesBuilder.removeSet(taxon.entities);
                _this._unitsBuilder.removeSet(taxon.units);
            }, this);
            return this;
        };

        TaxonBuilder.prototype.reset = function () {
            this._entitiesBuilder.reset();
            this._unitsBuilder.reset();
            return this;
        };
        return TaxonBuilder;
    })();
    Haeckel.TaxonBuilder = TaxonBuilder;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.BIT_MEMBER_MAX = 31;
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
    Haeckel.ORIGIN = Object.freeze({ hash: "(0:0)", x: 0, y: 0 });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        function create(x, y) {
            if (!isFinite(x)) {
                x = 0;
            }
            if (!isFinite(y)) {
                y = 0;
            }
            if (x === 0 && y === 0) {
                return Haeckel.ORIGIN;
            }
            return Object.freeze({
                hash: "(" + x + ":" + y + ")",
                x: x,
                y: y
            });
        }
        pt.create = create;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
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
    function DEFAULT_PROJECTOR(coords) {
        return Haeckel.pt.create((coords.lon + 180) / 360, (90 - coords.lat) / 180);
    }
    Haeckel.DEFAULT_PROJECTOR = DEFAULT_PROJECTOR;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.DEG_TO_RAD = Math.PI / 180;
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
    Haeckel.EMPTY_DAG_SOLVER = new Haeckel.DAGSolver(Haeckel.EMPTY_DIGRAPH);
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.EMPTY_DISTANCE_MATRIX = Object.freeze({ hashMap: Object.freeze({}), members: Haeckel.EMPTY_SET });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.EMPTY_MAP = Object.freeze(function (value) {
        return undefined;
    });
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
    (function (ext) {
        function includes(a, b) {
            if (a.hash === b.hash) {
                return true;
            }
            if (b.size > a.size) {
                return false;
            }
            if (a.size === Infinity) {
                return true;
            }
            for (var h in b.hashMap) {
                if (a.hashMap[h] === undefined) {
                    return false;
                }
            }
            return true;
        }
        ext.includes = includes;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function includes(a, b) {
            return Haeckel.ext.includes(a.entities, b.entities);
        }
        tax.includes = includes;
    })(Haeckel.tax || (Haeckel.tax = {}));
    var tax = Haeckel.tax;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function intersect(a, b) {
            return Haeckel.tax.create(Haeckel.ext.intersect(a.entities, b.entities));
        }
        tax.intersect = intersect;
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
    var PhyloSolver = (function () {
        function PhyloSolver(x) {
            this._cache = new Haeckel.SolverCache();
            this._taxonBuilder = new Haeckel.TaxonBuilder();
            function toUnitGraph(graph) {
                var builder = new Haeckel.DAGBuilder();
                Haeckel.ext.each(graph.vertices, function (taxon) {
                    builder.addVertices(taxon.units);
                });
                Haeckel.ext.each(graph.arcs, function (arc) {
                    Haeckel.ext.each(arc[0].units, function (head) {
                        Haeckel.ext.each(arc[1].units, function (tail) {
                            builder.addArc(head, tail);
                        });
                    });
                });
                return builder.build();
            }

            var dagSolver, graph;
            if (x instanceof Haeckel.DAGSolver) {
                dagSolver = x;
                graph = dagSolver.graph;
            } else if (x instanceof Haeckel.DAGBuilder) {
                graph = x.build();
            } else if (Haeckel.isDigraph(x)) {
                graph = x;
            } else {
            }
            var finalGraph = toUnitGraph(graph);
            if (dagSolver && Haeckel.equal(graph, finalGraph)) {
                this._dagSolver = dagSolver;
                this._graph = graph;
            } else {
                this._graph = finalGraph;
                this._dagSolver = new Haeckel.DAGSolver(finalGraph);
            }
        }
        Object.defineProperty(PhyloSolver.prototype, "dagSolver", {
            get: function () {
                return this._dagSolver;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PhyloSolver.prototype, "graph", {
            get: function () {
                return this._graph;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PhyloSolver.prototype, "universal", {
            get: function () {
                var key = "universal";
                var result = this._cache.get(key);
                if (result !== undefined) {
                    return result;
                }

                result = this._taxonBuilder.addSet(this._graph.vertices).build();
                this._taxonBuilder.reset();
                return this._cache.set(key, result);
            },
            enumerable: true,
            configurable: true
        });

        PhyloSolver.prototype.branch = function (internal, external) {
            var key = Haeckel.SolverCache.getKey("branch", [internal, external]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            return this._cache.set(key, Haeckel.tax.setDiff(this.prcIntersect(internal), this.prcUnion(external)));
        };

        PhyloSolver.prototype.clade = function (taxon) {
            if (taxon.empty) {
                return Haeckel.EMPTY_SET;
            }

            var key = Haeckel.SolverCache.getKey("clade", [taxon]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            if (taxon.isUnit || this.min(taxon).isUnit || this.isCladogen(this.min(taxon))) {
                result = this.sucUnion(taxon);
            } else {
                result = this.sucUnion(this.max(this.prcIntersect(taxon)));
            }

            return this._cache.set(key, result);
        };

        PhyloSolver.prototype.cladogen = function (taxon) {
            if (taxon.empty) {
                return Haeckel.EMPTY_SET;
            }

            var key = Haeckel.SolverCache.getKey("cladogen", [taxon]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            if (this.isCladogen(this.min(taxon))) {
                result = taxon;
            } else {
                result = this.max(this.prcIntersect(taxon));
            }

            return this._cache.set(key, result);
        };

        PhyloSolver.prototype.crown = function (specifiers, extant) {
            var key = Haeckel.SolverCache.getKey("crown", [specifiers, extant]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            return this._cache.set(key, this.clade(Haeckel.tax.intersect(this.clade(specifiers), extant)));
        };

        PhyloSolver.prototype.distance = function (x, y) {
            if (x.empty || y.empty) {
                return Infinity;
            }
            if (x === y) {
                return 0;
            }
            var xHash = x.hash;
            var yHash = y.hash;
            if (xHash === yHash) {
                return 0;
            }

            var key = Haeckel.SolverCache.getKey("distance", (xHash < yHash) ? [x, y] : [y, x]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            result = Infinity;
            Haeckel.ext.each(x.units, function (xUnit) {
                Haeckel.ext.each(y.units, function (yUnit) {
                    var dxy = this._dagSolver.distance(xUnit, yUnit);
                    if (!isFinite(result) || result > dxy) {
                        if ((result = dxy) === 0) {
                            return false;
                        }
                    }
                }, this);
                if (result === 0) {
                    return false;
                }
            }, this);

            return this._cache.set(key, result);
        };

        PhyloSolver.prototype.isCladogen = function (taxon) {
            if (taxon.empty) {
                return false;
            }
            if (taxon.isUnit) {
                return true;
            }
            return !this.sucIntersect(this.min(taxon)).empty;
        };

        PhyloSolver.prototype.max = function (taxon) {
            var key = Haeckel.SolverCache.getKey("max", [taxon]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            this._taxonBuilder.addSet(this.subgraphSolver(taxon).dagSolver.sinks);

            result = this._taxonBuilder.build();
            this._taxonBuilder.reset();
            return this._cache.set(key, result);
        };

        PhyloSolver.prototype.min = function (taxon) {
            var key = Haeckel.SolverCache.getKey("min", [taxon]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            this._taxonBuilder.addSet(this.subgraphSolver(taxon).dagSolver.sources);

            result = this._taxonBuilder.build();
            this._taxonBuilder.reset();
            return this._cache.set(key, result);
        };

        PhyloSolver.prototype.prcIntersect = function (taxon) {
            var key = Haeckel.SolverCache.getKey("prcIntersect", [taxon]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            Haeckel.ext.each(taxon.units, function (unit) {
                if (result === undefined) {
                    result = this.prcUnion(unit);
                } else {
                    result = Haeckel.tax.intersect(result, this.prcUnion(unit));
                }
                if (result.empty) {
                    return false;
                }
            }, this);

            return this._cache.set(key, result);
        };

        PhyloSolver.prototype.prcUnion = function (taxon) {
            var key = Haeckel.SolverCache.getKey("prcUnion", [taxon]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            Haeckel.ext.each(taxon.units, function (unit) {
                this._taxonBuilder.addSet(this._dagSolver.prcs(unit));
            }, this);

            result = this._taxonBuilder.build();
            this._taxonBuilder.reset();
            return this._cache.set(key, result);
        };

        PhyloSolver.prototype.subgraph = function (taxon) {
            return this._dagSolver.subgraph(taxon.units);
        };

        PhyloSolver.prototype.subgraphSolver = function (taxon) {
            if (taxon.hash === this.universal.hash) {
                return this;
            }

            var key = Haeckel.SolverCache.getKey("subgraphSolver", [taxon]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            return this._cache.set(key, new PhyloSolver(this.subgraph(taxon)));
        };

        PhyloSolver.prototype.sucIntersect = function (taxon) {
            var key = Haeckel.SolverCache.getKey("sucIntersect", [taxon]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            Haeckel.ext.each(taxon.units, function (unit) {
                if (result === undefined) {
                    result = this.sucUnion(unit);
                } else {
                    result = Haeckel.tax.intersect(result, this.sucUnion(unit));
                }
                if (result.empty) {
                    return false;
                }
            }, this);

            return this._cache.set(key, result);
        };

        PhyloSolver.prototype.sucUnion = function (taxon) {
            var key = Haeckel.SolverCache.getKey("sucUnion", [taxon]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            Haeckel.ext.each(taxon.units, function (unit) {
                this._taxonBuilder.addSet(this._dagSolver.sucs(unit));
            }, this);

            result = this._taxonBuilder.build();
            this._taxonBuilder.reset();
            return this._cache.set(key, result);
        };

        PhyloSolver.prototype.synPrc = function (apomorphic, representative) {
            var key = Haeckel.SolverCache.getKey("synPrc", [apomorphic, representative]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            if (Haeckel.tax.includes(apomorphic, representative)) {
                result = this.subgraphSolver(apomorphic).prcIntersect(representative);
            } else {
                result = Haeckel.EMPTY_SET;
            }

            return this._cache.set(key, result);
        };

        PhyloSolver.prototype.total = function (specifiers, extant) {
            var key = Haeckel.SolverCache.getKey("total", [specifiers, extant]);
            var result = this._cache.get(key);
            if (result !== undefined) {
                return result;
            }

            var crown = this.crown(specifiers, extant);
            return this._cache.set(key, this.clade(this.branch(crown, Haeckel.tax.setDiff(extant, crown))));
        };
        return PhyloSolver;
    })();
    Haeckel.PhyloSolver = PhyloSolver;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.EMPTY_PHYLO_SOLVER = new Haeckel.PhyloSolver(Haeckel.EMPTY_DAG_SOLVER);
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
    function isVector(o) {
        return Haeckel.isModel(o) && typeof o.angle === "number" && typeof o.distance === "number";
    }
    Haeckel.isVector = isVector;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.VECTOR_0 = Object.freeze({ angle: 0, distance: 0, hash: "(0->0)" });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (arr) {
        function contains(list, element) {
            for (var i = 0, n = list.length; i < n; ++i) {
                if (Haeckel.equal(list[i], element)) {
                    return true;
                }
            }
            return false;
        }
        arr.contains = contains;
    })(Haeckel.arr || (Haeckel.arr = {}));
    var arr = Haeckel.arr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (arr) {
        function forAll(list, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            for (var i = 0, n = list.length; i < n; ++i) {
                if (!f.call(thisObject, list[i])) {
                    return false;
                }
            }
            return true;
        }
        arr.forAll = forAll;
    })(Haeckel.arr || (Haeckel.arr = {}));
    var arr = Haeckel.arr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (arr) {
        function forSome(list, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            for (var i = 0, n = list.length; i < n; ++i) {
                if (f.call(thisObject, list[i])) {
                    return true;
                }
            }
            return false;
        }
        arr.forSome = forSome;
    })(Haeckel.arr || (Haeckel.arr = {}));
    var arr = Haeckel.arr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (arr) {
        function map(list, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            for (var i = 0, n = list.length, image = []; i < n; ++i) {
                image.push(f.call(thisObject, list[i]));
            }
            return image;
        }
        arr.map = map;
    })(Haeckel.arr || (Haeckel.arr = {}));
    var arr = Haeckel.arr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (arr) {
        function where(list, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            for (var i = 0, n = list.length, image = []; i < n; ++i) {
                var element = list[i];
                if (f.call(thisObject, element)) {
                    image.push(element);
                }
            }
            return image;
        }
        arr.where = where;
    })(Haeckel.arr || (Haeckel.arr = {}));
    var arr = Haeckel.arr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function contains(s, n) {
            return (s.bits & (1 << n)) !== 0;
        }
        bit.contains = contains;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
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
        function each(s, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            for (var i = 0; i <= Haeckel.BIT_MEMBER_MAX; ++i) {
                if (s.bits & (1 << i)) {
                    if (f.call(thisObject, i) === false) {
                        return;
                    }
                }
            }
        }
        bit.each = each;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function forAll(s, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            for (var i = 0; i <= Haeckel.BIT_MEMBER_MAX; ++i) {
                if (s.bits & (1 << i)) {
                    if (!f.call(thisObject, i)) {
                        return false;
                    }
                }
            }
            return true;
        }
        bit.forAll = forAll;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function forSome(s, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            for (var i = 0; i <= Haeckel.BIT_MEMBER_MAX; ++i) {
                if (s.bits & (1 << i)) {
                    if (f.call(thisObject, i)) {
                        return true;
                    }
                }
            }
            return false;
        }
        bit.forSome = forSome;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function includes(superset, subset) {
            return (superset.bits & subset.bits) === subset.bits;
        }
        bit.includes = includes;
    })(Haeckel.bit || (Haeckel.bit = {}));
    var bit = Haeckel.bit;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (bit) {
        function prIncludes(superset, subset) {
            return superset.bits !== subset.bits && (superset.bits & subset.bits) === subset.bits;
        }
        bit.prIncludes = prIncludes;
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
    (function (bit) {
        function setDiff(minuend, subtrahend) {
            return Haeckel.bit.createFromBits((minuend.bits ^ subtrahend.bits) & minuend.bits);
        }
        bit.setDiff = setDiff;
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
    (function (ext) {
        function distance(a, b) {
            if (a === null || b === null) {
                return Haeckel.EMPTY_SET;
            }
            if (Haeckel.equal(a, b) || a.size === Infinity || b.size === Infinity) {
                return a.size === 1 ? Haeckel.RANGE_0 : Haeckel.RANGE_0_TO_1;
            }
            return Haeckel.ext.intersect(a, b).empty ? Haeckel.RANGE_1 : Haeckel.RANGE_0_TO_1;
        }
        ext.distance = distance;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function read(data) {
            if (data === null || data === undefined) {
                return null;
            }
            if (Array.isArray(data)) {
                return Haeckel.ext.create(data);
            }
            return Haeckel.ext.create([data]);
        }
        ext.read = read;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
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
            var threshold = 1 / n, builder = new Haeckel.ExtSetBuilder();
            for (var i = 0; i < n; ++i) {
                var ws = statesList[i];
                if (ws.weight >= threshold && ws.states !== null) {
                    builder.addSet(ws.states);
                }
            }
            return builder.build();
        }

        function createExt(domain, inferrable, distance) {
            var c = Haeckel.chr.initiate(domain);
            c.combine = Haeckel.combiner(Haeckel.ext.union);
            c.readStates = function (data) {
                return Haeckel.ext.read(data);
            };
            c.writeStates = Haeckel.ext.list;
            if (distance) {
                c.distance = Haeckel.ext.distance;
            }
            if (inferrable) {
                c.inferrer = Object.freeze({ average: average });
            }
            return Object.freeze(c);
        }
        chr.createExt = createExt;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ist) {
        function create(criterion) {
            var s = {
                criterion: criterion,
                empty: false,
                hash: '{x:f(x);f=' + String(criterion) + '}'
            };
            return Object.freeze(s);
        }
        ist.create = create;
    })(Haeckel.ist || (Haeckel.ist = {}));
    var ist = Haeckel.ist;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (chr) {
        function createInt(criterion, combine, readStates, writeStates) {
            var domain = Haeckel.ist.create(criterion), c = Haeckel.chr.initiate(domain);
            c.combine = combine ? combine : Haeckel.combiner(function (sets) {
                return Haeckel.ist.union(sets);
            });
            c.readStates = readStates;
            c.writeStates = writeStates;
            return Object.freeze(c);
        }
        chr.createInt = createInt;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function sum(ranges) {
            var min = NaN, max = NaN;
            for (var i = 0, n = ranges.length; i < n; ++i) {
                var r = ranges[i];
                if (r.empty) {
                    continue;
                }
                if (isNaN(min)) {
                    min = r.min;
                } else {
                    min += r.min;
                }
                if (isNaN(max)) {
                    max = r.max;
                } else {
                    max += r.max;
                }
            }
            return Haeckel.rng.create(min, max);
        }
        rng.sum = sum;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (chr) {
        function toDistanceMatrix(matrix, anchors) {
            if (typeof anchors === "undefined") { anchors = null; }
            var hashMap = {};
            if (anchors === null) {
                anchors = matrix.taxon;
            }
            var allUnits = Haeckel.ext.union([anchors.units, matrix.taxon.units]), nChars = matrix.characters.size;
            Haeckel.ext.each(allUnits, function (x) {
                return hashMap[x.hash] = {};
            });
            Haeckel.ext.each(matrix.characters, function (character) {
                if (typeof character.distance !== 'function') {
                    console.warn('Cannot compute distance of character:', character);
                    return;
                }
                var charHashMap = {};
                Haeckel.ext.each(anchors.units, function (x) {
                    var xStates = Haeckel.chr.states(matrix, x, character);
                    if (charHashMap[x.hash] === undefined) {
                        charHashMap[x.hash] = {};
                    }
                    Haeckel.ext.each(allUnits, function (y) {
                        if (charHashMap[y.hash] === undefined) {
                            charHashMap[y.hash] = {};
                        }
                        var yStates = Haeckel.chr.states(matrix, y, character);
                        charHashMap[x.hash][y.hash] = charHashMap[y.hash][x.hash] = character.distance(xStates, yStates);
                    });
                });
                var xHash, yHash;
                for (xHash in charHashMap) {
                    var sourceRow = charHashMap[xHash], targetRow = hashMap[xHash];
                    for (yHash in sourceRow) {
                        var sourceD = sourceRow[yHash], targetD = targetRow[yHash];
                        if (targetD === undefined) {
                            targetRow[yHash] = sourceD;
                        } else {
                            targetRow[yHash] = Haeckel.rng.sum([targetD, sourceD]);
                        }
                    }
                }
            });
            return Object.freeze({
                hashMap: Object.freeze(hashMap),
                members: allUnits
            });
        }
        chr.toDistanceMatrix = toDistanceMatrix;
    })(Haeckel.chr || (Haeckel.chr = {}));
    var chr = Haeckel.chr;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (clr) {
        function constrain(c) {
            c = Math.floor(c);
            if (!isFinite(c) || c < 0 || c >= 0x100) {
                return -1;
            }
            return c;
        }

        function toHex(n) {
            var s = n.toString(16);
            while (s.length < 2) {
                s = '0' + s;
            }
            return s;
        }

        function create(r, g, b) {
            r = constrain(r);
            g = constrain(g);
            b = constrain(b);
            var error = r < 0 || g < 0 || b < 0, hex;
            if (error) {
                r = g = b = -1;
                hex = 'none';
            } else {
                hex = '#' + toHex(r) + toHex(g) + toHex(b);
            }
            return Object.freeze({
                r: r,
                g: g,
                b: b,
                error: error,
                hex: hex
            });
        }
        clr.create = create;
    })(Haeckel.clr || (Haeckel.clr = {}));
    var clr = Haeckel.clr;
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
    (function (dat) {
        function toCharacterMatrixBuilder(datings, phyloSolver) {
            var builder = new Haeckel.CharacterMatrixBuilder();
            Haeckel.ext.each(datings, function (dating) {
                return builder.states(phyloSolver.cladogen(Haeckel.tax.union(Haeckel.ext.list(dating.taxa))), Haeckel.TIME_CHARACTER, dating.time);
            });
            return builder;
        }
        dat.toCharacterMatrixBuilder = toCharacterMatrixBuilder;
    })(Haeckel.dat || (Haeckel.dat = {}));
    var dat = Haeckel.dat;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isPoint3D(o) {
        return Haeckel.isPoint(o) && typeof o.z === 'number';
    }
    Haeckel.isPoint3D = isPoint3D;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (geo) {
        function toPoint3D(coords, radius) {
            if (typeof radius === "undefined") { radius = 1; }
            var lat = coords.lat * Haeckel.DEG_TO_RAD, lon = coords.lon * Haeckel.DEG_TO_RAD, cosLat = Math.cos(lat);
            if (radius === 1) {
                return Haeckel.pt.create3D(cosLat * Math.cos(lon), cosLat * Math.sin(lon), Math.sin(lat));
            }
            cosLat *= radius;
            return Haeckel.pt.create3D(cosLat * Math.cos(lon), cosLat * Math.sin(lon), Math.sin(lat) * radius);
        }
        geo.toPoint3D = toPoint3D;
    })(Haeckel.geo || (Haeckel.geo = {}));
    var geo = Haeckel.geo;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (geo) {
        function center(r) {
            function processList(coordsList) {
                for (var i = 0, n2 = coordsList.length; i < n2; ++i) {
                    var p3 = Haeckel.geo.toPoint3D(coordsList[i]);
                    x += p3.x;
                    y += p3.y;
                    z += p3.z;
                }
                n += n2;
            }

            var x = 0, y = 0, z = 0, n = 0;
            if (Haeckel.isExtSet(r)) {
                Haeckel.ext.each(r, processList);
            } else if (Array.isArray(r)) {
                processList(r);
            }
            if (n === 0) {
                return null;
            }
            x /= n;
            y /= n;
            z /= n;
            var lon = Math.atan2(y, x), lat = Math.atan2(z, Math.sqrt(x * x + y * y));
            return Haeckel.geo.createCoords(lat * 180 / Math.PI, lon * 180 / Math.PI);
        }
        geo.center = center;
    })(Haeckel.geo || (Haeckel.geo = {}));
    var geo = Haeckel.geo;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (geo) {
        function project(regions, projector) {
            var shapes = [];
            Haeckel.ext.each(regions, function (region) {
                var shape = [];
                Haeckel.arr.each(region, function (coords) {
                    return shape.push(projector(coords));
                });
                shapes.push(shape);
            });
            return shapes;
        }
        geo.project = project;
    })(Haeckel.geo || (Haeckel.geo = {}));
    var geo = Haeckel.geo;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ist) {
        function union(sets) {
            var n = sets.length;
            if (n === 0) {
                return Haeckel.EMPTY_SET;
            }
            if (n === 1) {
                return sets[0];
            }
            return Haeckel.ist.create(function (element) {
                for (var i = 0; i < n; ++i) {
                    if (sets[i].criterion(element)) {
                        return true;
                    }
                }
                return false;
            });
        }
        ist.union = union;
    })(Haeckel.ist || (Haeckel.ist = {}));
    var ist = Haeckel.ist;
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
    (function (pt) {
        function create3D(x, y, z) {
            if (!isFinite(x)) {
                x = 0;
            }
            if (!isFinite(y)) {
                y = 0;
            }
            if (!isFinite(z)) {
                z = 0;
            }
            return Object.freeze({
                hash: "(" + String(x) + ":" + String(y) + ":" + String(z) + ")",
                x: x,
                y: y,
                z: z
            });
        }
        pt.create3D = create3D;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function isAxis(o) {
        return typeof o === "object" && Haeckel.isRange(o.range) && typeof o.step === "number" && (o.labelFunction === undefined || typeof o.labelFunction === "function");
    }
    Haeckel.isAxis = isAxis;
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
    function isInferrer(o) {
        return typeof o === "object" && typeof o.average === "function";
    }
    Haeckel.isInferrer = isInferrer;
})(Haeckel || (Haeckel = {}));