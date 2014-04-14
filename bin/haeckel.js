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
    Haeckel.SVG_NS = "http://www.w3.org/2000/svg";
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function compareGradientEntries(a, b) {
        return a.ratio - b.ratio;
    }

    function percent(ratio) {
        return String(ratio * 100) + '%';
    }

    var LinearGradientBuilder = (function () {
        function LinearGradientBuilder(defsBuilder, id) {
            this.defsBuilder = defsBuilder;
            this.id = id;
            this.angle = 0;
            this.bottom = 1;
            this.end = Haeckel.BLACK;
            this.endOpacity = 1;
            this.left = 0;
            this.right = 0;
            this.start = Haeckel.BLACK;
            this.startOpacity = 1;
            this.top = 0;
            this._stops = [];
        }
        LinearGradientBuilder.prototype.add = function (entry) {
            if (entry.ratio <= 0 || isNaN(entry.ratio)) {
                this.start = entry.color;
            } else if (entry.ratio >= 1) {
                this.end = entry.color;
            } else {
                this._stops.push(entry);
            }
            return this;
        };

        LinearGradientBuilder.prototype.build = function () {
            this._stops = this._stops.sort(compareGradientEntries);
            var linearGradient = this.defsBuilder.child(Haeckel.SVG_NS, 'linearGradient').attrs(Haeckel.SVG_NS, {
                id: this.id,
                x1: percent(this.left),
                y1: percent(this.top),
                x2: percent(this.right),
                y2: percent(this.bottom)
            });
            linearGradient.child(Haeckel.SVG_NS, 'stop').attrs(Haeckel.SVG_NS, {
                offset: '0%',
                'stop-color': 'rgb(' + this.start.r + ',' + this.start.g + ',' + this.start.b + ')',
                'stop-opacity': percent(this.startOpacity)
            });
            for (var i = 0, n = this._stops.length; i < n; ++i) {
                var stop = this._stops[i];
                linearGradient.child(Haeckel.SVG_NS, 'stop').attrs(Haeckel.SVG_NS, {
                    offset: percent(stop.ratio),
                    'stop-color': 'rgb(' + stop.color.r + ',' + stop.color.g + ',' + stop.color.b + ')',
                    'stop-opacity': percent(stop.opacity)
                });
            }
            linearGradient.child(Haeckel.SVG_NS, 'stop').attrs(Haeckel.SVG_NS, {
                offset: '100%',
                'stop-color': 'rgb(' + this.end.r + ',' + this.end.g + ',' + this.end.b + ')',
                'stop-opacity': percent(this.endOpacity)
            });
            return linearGradient;
        };

        LinearGradientBuilder.prototype.reset = function () {
            this.angle = 0;
            this.end = Haeckel.BLACK;
            this.start = Haeckel.BLACK;
            this._stops = [];
            return this;
        };

        LinearGradientBuilder.prototype.resetEntries = function () {
            this._stops = [];
            return this;
        };

        LinearGradientBuilder.prototype.resetID = function (id) {
            this.id = id;
            return this.reset();
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
        function powerList(l) {
            var builder = new Haeckel.ExtSetBuilder(), n = l.length;
            if (n === 0) {
                builder.add(Haeckel.EMPTY_SET);
            } else {
                var first = Haeckel.ext.create([l[0]]);
                if (n === 1) {
                    builder.add(Haeckel.EMPTY_SET);
                    builder.add(first);
                } else {
                    Haeckel.ext.each(powerList(l.slice(1, n)), function (s) {
                        builder.add(s);
                        builder.add(Haeckel.ext.union([first, s]));
                    });
                }
            }
            return builder.build();
        }

        function power(s) {
            return powerList(Haeckel.ext.list(s));
        }
        ext.power = power;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function power(taxon) {
            var entitySets = Haeckel.ext.power(taxon.entities), builder = new Haeckel.ExtSetBuilder();
            Haeckel.ext.each(entitySets, function (s) {
                builder.add(Haeckel.tax.create(s));
            });
            return builder.build();
        }
        tax.power = power;
    })(Haeckel.tax || (Haeckel.tax = {}));
    var tax = Haeckel.tax;
})(Haeckel || (Haeckel = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Haeckel;
(function (Haeckel) {
    var TaxicDistanceMatrixBuilder = (function (_super) {
        __extends(TaxicDistanceMatrixBuilder, _super);
        function TaxicDistanceMatrixBuilder() {
            _super.apply(this, arguments);
        }
        TaxicDistanceMatrixBuilder.prototype.addRange = function (a, b, range) {
            var _this = this;
            Haeckel.ext.each(Haeckel.tax.power(a), function (a) {
                if (!a.empty) {
                    Haeckel.ext.each(Haeckel.tax.power(b), function (b) {
                        if (!b.empty) {
                            _super.prototype.addRange.call(_this, a, b, range);
                        }
                    });
                }
            });
            return this;
        };
        return TaxicDistanceMatrixBuilder;
    })(Haeckel.DistanceMatrixBuilder);
    Haeckel.TaxicDistanceMatrixBuilder = TaxicDistanceMatrixBuilder;
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
    (function (rec) {
        function create(x, y, width, height) {
            if (isNaN(width) || width < 0) {
                throw new Error("Invalid width: " + String(width) + ".");
            }
            if (isNaN(height) || height < 0) {
                throw new Error("Invalid height: " + String(height) + ".");
            }
            return Object.freeze({
                area: width * height,
                bottom: y + height,
                centerX: x + (width / 2),
                centerY: y + (height / 2),
                empty: false,
                hash: "(" + x + ":" + y + " -> " + width + ":" + height + ")",
                height: height,
                left: x,
                right: x + width,
                top: y,
                width: width,
                x: x,
                y: y,
                x2: x + width,
                y2: y + height
            });
        }
        rec.create = create;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rec) {
        function createFromBoundingClientRect(svg) {
            var rect = svg.getBoundingClientRect();
            return Haeckel.rec.create(rect.left, rect.top, rect.width, rect.height);
        }
        rec.createFromBoundingClientRect = createFromBoundingClientRect;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
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
    var DEFAULT_AXIS = Object.freeze({
        range: Haeckel.RANGE_0_TO_1,
        step: 0.1
    });

    var LINE_STYLE = {
        "stroke-opacity": '1',
        "stroke-linecap": "square"
    };

    var AxisChart = (function () {
        function AxisChart() {
            this.area = Haeckel.EMPTY_SET;
            this.axis = DEFAULT_AXIS;
            this.lineStyle = null;
        }
        AxisChart.prototype.render = function (parent) {
            function vLine(x, top, bottom) {
                return g.child(Haeckel.SVG_NS, 'path').attrs(Haeckel.SVG_NS, {
                    'path': "M" + x + " " + top + "V " + bottom,
                    'style': lineStyle
                });
            }

            var area = this.area.empty ? Haeckel.rec.createFromBoundingClientRect(parent.build()) : this.area, axis = this.axis, lineStyle = Haeckel.ElementBuilder.style(this.lineStyle || LINE_STYLE), g = parent.child(Haeckel.SVG_NS, 'g');
            if (Haeckel.isAxis(axis) && !axis.range.empty && axis.step > 0 && isFinite(axis.step)) {
                var factor = area.width / axis.range.size, start = axis.range.min, end = axis.range.max, step = axis.step;
                for (var value = start; value <= end; value += step) {
                    var x = (value - start) * factor + area.left;
                    vLine(x, area.top, area.bottom);
                }
            }
            return g;
        };
        return AxisChart;
    })();
    Haeckel.AxisChart = AxisChart;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DEFAULT_AXIS = Object.freeze({
        range: Haeckel.RANGE_0_TO_1,
        step: 0.1
    });

    var DEFAULT_LABEL_FUNCTION = function (value) {
        return String(value);
    };

    var STYLE = {
        "text-anchor": "middle"
    };

    var AxisLabeler = (function () {
        function AxisLabeler() {
            this.area = Haeckel.EMPTY_SET;
            this.axis = DEFAULT_AXIS;
            this.style = null;
        }
        AxisLabeler.prototype.render = function (parent) {
            function text(x, y, text) {
                return g.child(Haeckel.SVG_NS, 'text').attrs(Haeckel.SVG_NS, {
                    'x': x + 'px',
                    'y': y + 'px'
                }).text(text);
            }

            var area = this.area.empty ? Haeckel.rec.createFromBoundingClientRect(parent.build()) : this.area, axis = this.axis, style = Haeckel.ElementBuilder.style(this.style || STYLE), g = parent.child(Haeckel.SVG_NS, 'g');
            if (Haeckel.isAxis(axis) && !axis.range.empty && axis.step > 0 && isFinite(axis.step)) {
                var factor = area.width / axis.range.size, start = axis.range.min, end = axis.range.max, step = axis.step, labelFunction = (axis.labelFunction === undefined) ? DEFAULT_LABEL_FUNCTION : axis.labelFunction;
                for (var value = start; value <= end; value += step) {
                    var x = (value - start) * factor + area.left;
                    text(x, area.bottom, labelFunction(value));
                }
            }
            return g;
        };
        return AxisLabeler;
    })();
    Haeckel.AxisLabeler = AxisLabeler;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var ChronoChart = (function () {
        function ChronoChart() {
            this.area = Haeckel.EMPTY_SET;
            this.time = Haeckel.RANGE_0;
        }
        ChronoChart.prototype.copyFrom = function (chart) {
            this.area = chart.area;
            this.time = chart.time;
            return this;
        };

        ChronoChart.prototype.getTimeY = function (time) {
            var area = this.area;
            if (!Haeckel.isRange(time) || time.empty) {
                return Haeckel.EMPTY_SET;
            }
            var size = Math.max(1, this.time.size), y1 = area.bottom - (area.height * (time.max - this.time.min) / size) - 0.5, y2 = area.bottom - (area.height * (time.min - this.time.min) / size) + 0.5;
            return Haeckel.rng.create(y1, y2);
        };
        return ChronoChart;
    })();
    Haeckel.ChronoChart = ChronoChart;
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
    Haeckel.TIME_CHARACTER = Haeckel.chr.createRange(Haeckel.RANGE_NEG_INF, true, true);
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
    (function (rec) {
        function createFromCoords(x1, y1, x2, y2) {
            return Haeckel.rec.create(x1, y1, x2 - x1, y2 - y1);
        }
        rec.createFromCoords = createFromCoords;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function add(r, value) {
            if (!isFinite(value)) {
                throw new Error("Not a finite number: " + value + ".");
            }
            if (r.empty) {
                return Haeckel.EMPTY_SET;
            }
            return Haeckel.rng.create(r.min + value, r.max + value);
        }
        rng.add = add;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function constrain(original, constraint) {
            if (constraint.empty || original.empty) {
                return Haeckel.EMPTY_SET;
            }
            if (Haeckel.equal(original, constraint)) {
                return original;
            }
            var min = Math.max(constraint.min, original.min), max = Math.min(constraint.max, original.max);
            if (max < min) {
                return Haeckel.EMPTY_SET;
            }
            return Haeckel.rng.create(min, max);
        }
        rng.constrain = constrain;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var ChronoCharChart = (function (_super) {
        __extends(ChronoCharChart, _super);
        function ChronoCharChart() {
            _super.apply(this, arguments);
            this.characterMatrix = Haeckel.EMPTY_CHARACTER_MATRIX;
            this.horizontalRatioMap = function (taxon) {
                return Haeckel.RANGE_0_TO_1;
            };
        }
        ChronoCharChart.prototype.copyFrom = function (chart) {
            _super.prototype.copyFrom.call(this, chart);
            if (chart instanceof ChronoCharChart) {
                this.characterMatrix = chart.characterMatrix;
                this.horizontalRatioMap = chart.horizontalRatioMap;
            }
            return this;
        };

        ChronoCharChart.prototype.getTaxonRect = function (taxon) {
            var time = Haeckel.chr.states(this.characterMatrix, taxon, Haeckel.TIME_CHARACTER), y = this.getTimeY(time);
            if (y.empty) {
                return Haeckel.EMPTY_SET;
            }
            var x = this.getTaxonX(taxon);
            return Haeckel.rec.createFromCoords(x.min, y.min, x.max, y.max);
        };

        ChronoCharChart.prototype.getTaxonX = function (taxon) {
            var hRatioRange = this.horizontalRatioMap(taxon), area = this.area;
            if (!Haeckel.isRange(hRatioRange)) {
                return Haeckel.rng.create(area.left, area.right);
            }
            hRatioRange = Haeckel.rng.constrain(hRatioRange, Haeckel.RANGE_0_TO_1);
            var x1 = area.left + hRatioRange.min * area.width, x2 = area.left + hRatioRange.max * area.width + 1;
            return Haeckel.rng.create(x1, x2);
        };

        ChronoCharChart.prototype.useCharacterMatrixForHorizontal = function (leftTaxon, rightTaxon) {
            function getDistance(focus, taxon) {
                if (!focus || !taxon || focus.empty || taxon.empty) {
                    return Haeckel.EMPTY_SET;
                }
                var builder = new Haeckel.RangeBuilder();
                Haeckel.ext.each(focus.units, function (x) {
                    Haeckel.ext.each(taxon.units, function (y) {
                        return builder.addRange(Haeckel.dst.get(distanceMatrix, x, y));
                    });
                });
                return builder.build();
            }

            var distanceMatrix = Haeckel.chr.toDistanceMatrix(this.characterMatrix);
            this.horizontalRatioMap = function (taxon) {
                var dl = getDistance(taxon, leftTaxon), dr = getDistance(taxon, rightTaxon);
                if (!dr.empty) {
                    dr = Haeckel.rng.add(Haeckel.rng.multiply(dr, -1), 1);
                }
                if (dl.empty) {
                    return dr;
                }
                if (dr.empty) {
                    return dl;
                }
                var d = Haeckel.rng.sum([dl, dr]);
                return Haeckel.rng.multiply(d, 0.5);
            };
            return this;
        };
        return ChronoCharChart;
    })(Haeckel.ChronoChart);
    Haeckel.ChronoCharChart = ChronoCharChart;
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
    (function (pt) {
        function contains(shape, p) {
            var c = false, n = shape.length, i = 0, j = n - 1;
            for (; i < n; j = i++) {
                var a = shape[i], b = shape[j];
                if ((a.y >= p.y) != (b.y >= p.y) && p.x <= (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) {
                    c = !c;
                }
            }
            return c;
        }
        pt.contains = contains;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        function rectangle(shape) {
            var n = shape.length;
            if (n === 0) {
                return Haeckel.EMPTY_SET;
            }
            var p = shape[0], x = p.x, y = p.y, x2 = x, y2 = y;
            for (var i = 1, n = shape.length; i < n; ++i) {
                p = shape[i];
                x = Math.min(x, p.x);
                y = Math.min(y, p.y);
                x2 = Math.max(x2, p.x);
                y2 = Math.max(y2, p.y);
            }
            return Haeckel.rec.createFromCoords(x, y, x2, y2);
        }
        pt.rectangle = rectangle;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        function area(shape) {
            var n = shape.length;
            if (n <= 2) {
                return 0;
            }
            var area = 0, a = shape[n - 1];
            for (var i = 0; i < n; ++i) {
                var b = shape[i];
                area += (b.x - a.x) * (a.y + b.y) / 2;
                a = b;
            }
            return Math.abs(area);
        }
        pt.area = area;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        function weight(shape, area) {
            if (typeof area === "undefined") { area = NaN; }
            switch (shape.length) {
                case 0: {
                    return 0;
                }
                case 1: {
                    return 1;
                }
                case 2: {
                    var a = shape[0], b = shape[1], x = a.x - b.x, y = a.y - b.y;
                    return Math.sqrt(x * x + y * y);
                }
                default: {
                    if (isNaN(area)) {
                        return Haeckel.pt.area(shape);
                    }
                    return area;
                }
            }
        }
        pt.weight = weight;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        function weights(shapes, areas) {
            var n = shapes.length, weights = new Array(n);
            if (n > 0) {
                if (areas && areas.length !== n) {
                    console.warn('Mismatch between number of shapes (' + n + ') and number of calculated areas provided (' + areas.length + ').');
                    while (areas.length < n) {
                        areas.push(0);
                    }
                }
                var total = 0;
                for (var i = 0; i < n; ++i) {
                    weights[i] = total += Haeckel.pt.weight(shapes[i], areas ? areas[i] : NaN);
                }
            }
            return weights;
        }
        pt.weights = weights;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rec) {
        function random(r, random) {
            if (!random) {
                random = Math.random;
            }
            return Haeckel.pt.create(r.x + (r.x2 - r.x) * random(), r.y + (r.y2 - r.y) * random());
        }
        rec.random = random;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        var MAX_RANDOM_ATTEMPTS = 1000;

        function random(a, b, random) {
            function randomInSegment(a, b) {
                var ratio = random();
                return Haeckel.pt.create(a.x + (b.x - a.x) * ratio, a.y + (b.y - a.y) * ratio);
            }

            function randomInShape(shape) {
                switch (shape.length) {
                    case 0: {
                        return null;
                    }
                    case 1: {
                        return shape[0];
                    }
                    case 2: {
                        return randomInSegment(shape[0], shape[1]);
                    }
                    default: {
                        var rect = Haeckel.pt.rectangle(shape);
                        if (rect.x === rect.x2 || rect.y === rect.y2) {
                            return randomInSegment(Haeckel.pt.create(rect.x, rect.y), Haeckel.pt.create(rect.x2, rect.y2));
                        }
                        var attempts = MAX_RANDOM_ATTEMPTS;
                        while (attempts-- > 0) {
                            var p = Haeckel.rec.random(rect, random);
                            if (Haeckel.pt.contains(shape, p)) {
                                return p;
                            }
                        }
                        return Haeckel.pt.create(rect.centerX, rect.centerY);
                    }
                }
            }

            function randomInShapes(shapes, weightList) {
                var n = shapes.length;
                if (n === 0) {
                    return null;
                }
                if (n === 1) {
                    return randomInShape(shapes[0]);
                }
                if (weightList) {
                    if (weightList.length !== n) {
                        console.warn('Mismatch between points in shape (' + n + ') and number of calculated weights provided (' + weightList.length + ').');
                        weightList = null;
                    }
                }
                if (!weightList) {
                    weightList = Haeckel.pt.weights(shapes);
                }
                var total = weightList[--n];
                if (total <= 0) {
                    return null;
                }
                var r = random() * total;
                for (var i = 0; i < n; ++i) {
                    if (r < weightList[i]) {
                        randomInShape(shapes[i]);
                    }
                }
                return randomInShape(shapes[n]);
            }

            if (!random) {
                random = Math.random;
            }
            if (Array.isArray(a)) {
                return randomInShapes(a, b);
            }
            return randomInSegment(a, b);
        }
        pt.random = random;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
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
    var DEFAULT_AREA = Haeckel.rec.create(0, 0, 360, 180);

    var GeoChart = (function () {
        function GeoChart() {
            this.area = DEFAULT_AREA;
            this.color = Haeckel.BLACK;
            this.minThickness = 1;
            this.occurrences = Haeckel.EMPTY_SET;
            this.projector = Haeckel.DEFAULT_PROJECTOR;
            this.random = Math.random;
        }
        GeoChart.prototype.project = function (coords) {
            var p = this.projector(coords), area = this.area, result = Haeckel.pt.create(area.x + p.x * area.width, area.y + p.y * area.height);
            return result;
        };

        GeoChart.prototype.render = function (parent) {
            var _this = this;
            function createLine(a, b, occurrence) {
                g.child(Haeckel.SVG_NS, 'path').attrs(Haeckel.SVG_NS, {
                    'd': 'M' + a.x + ' ' + a.y + 'L' + b.x + ' ' + b.y,
                    'stroke': color.hex,
                    'stroke-opacity': '1',
                    'stroke-width': minThickness + 'px'
                });
            }

            function createPoint(p, occurrence) {
                g.child(Haeckel.SVG_NS, 'circle').attrs(Haeckel.SVG_NS, {
                    'cx': p.x + 'px',
                    'cy': p.y + 'px',
                    'r': minThickness + 'px',
                    'color': color.hex,
                    'stroke': color.hex,
                    'stroke-opacity': '1',
                    'stroke-width': minThickness + 'px'
                });
            }

            function createPolygon(points, occurrence) {
                if (!pathBuilder) {
                    pathBuilder = new Haeckel.PathBuilder();
                } else {
                    pathBuilder.reset();
                }
                Haeckel.arr.each(points, function (point) {
                    return pathBuilder.add(point);
                });
                g.child(Haeckel.SVG_NS, 'path').attrs(Haeckel.SVG_NS, {
                    'd': pathBuilder.build(),
                    'fill': color.hex,
                    'fill-opacity': '1',
                    'stroke': color.hex,
                    'stroke-opacity': '1',
                    'stroke-width': minThickness + 'px'
                });
            }

            function fill(shapes, occurrence) {
                Haeckel.arr.each(shapes, function (shape) {
                    var n = shape.length;
                    switch (n) {
                        case 0: {
                            break;
                        }
                        case 1: {
                            createPoint(shape[0], occurrence);
                            break;
                        }
                        case 2: {
                            createLine(shape[0], shape[1], occurrence);
                            break;
                        }
                        default: {
                            createPolygon(shape, occurrence);
                            break;
                        }
                    }
                });
            }

            var pathBuilder, color = this.color, minThickness = this.minThickness, self = this, projector = function (coords) {
                return self.project(coords);
            }, g = parent.child(Haeckel.SVG_NS, 'g'), i;

            Haeckel.ext.each(this.occurrences, function (occurrence) {
                if (occurrence.count.empty) {
                    return;
                }
                var shapes = Haeckel.geo.project(occurrence.geo, projector), weights = Haeckel.pt.weights(shapes), n = weights.length;
                if (n === 0) {
                    return;
                }
                var count = occurrence.count.mean;
                if (weights[n - 1] <= count) {
                    fill(shapes, occurrence);
                } else {
                    for (i = 0; i < count; ++i) {
                        createPoint(Haeckel.pt.random(shapes, weights, _this.random), occurrence);
                    }
                }
            }, this);

            return g;
        };
        return GeoChart;
    })();
    Haeckel.GeoChart = GeoChart;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.EMPTY_DAG_SOLVER = new Haeckel.DAGSolver(Haeckel.EMPTY_DIGRAPH);
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
    Haeckel.DEG_TO_RAD = Math.PI / 180;
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
    (function (nom) {
        function forTaxon(nomenclature, taxon) {
            if (taxon.empty) {
                return Haeckel.EMPTY_SET;
            }
            var builder = new Haeckel.ExtSetBuilder(), h = taxon.hash;
            Haeckel.ext.each(nomenclature.names, function (name) {
                if (h === Haeckel.hash(nomenclature.nameMap[name])) {
                    builder.add(name);
                }
            });
            return builder.build();
        }
        nom.forTaxon = forTaxon;
    })(Haeckel.nom || (Haeckel.nom = {}));
    var nom = Haeckel.nom;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DEFAULT_LINE_ATTRS_VALUE = {
        'opacity': '0.5',
        'stroke-linecap': 'round',
        'stroke-width': '3px'
    };

    var DEFAULT_MAP_AREA = Haeckel.rec.create(0, 0, 360, 180);

    function DEFAULT_LINE_ATTRS(source, target, solver) {
        return DEFAULT_LINE_ATTRS_VALUE;
    }
    ;

    var GeoPhyloChart = (function () {
        function GeoPhyloChart() {
            this.color = Haeckel.BLACK;
            this.extensions = true;
            this.lineAttrs = DEFAULT_LINE_ATTRS;
            this.mapArea = DEFAULT_MAP_AREA;
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
            this.occurrenceMatrix = Haeckel.EMPTY_CHARACTER_MATRIX;
            this.paddingY = 6;
            this.projector = Haeckel.DEFAULT_PROJECTOR;
            this.rootRadius = 3;
            this.solver = Haeckel.EMPTY_DAG_SOLVER;
        }
        GeoPhyloChart.prototype.project = function (coords) {
            var p = this.projector(coords), area = this.mapArea, result = Haeckel.pt.create(area.x + p.x * area.width, area.y + p.y * area.height);
            return result;
        };

        GeoPhyloChart.prototype.render = function (parent) {
            var _this = this;
            function drawExtensions(coords, taxon, lineAttrs) {
                var regions = Haeckel.chr.states(matrix, taxon, Haeckel.GEO_CHARACTER);
                if (regions) {
                    Haeckel.ext.each(regions, function (region) {
                        return drawLine(coords, Haeckel.geo.center(region), lineAttrs);
                    });
                }
            }

            function drawLine(source, target, lineAttrs) {
                function curve(x1, x2) {
                    var minX, maxX, cx = midp.x;
                    if (x1 < x2) {
                        minX = x1;
                        maxX = x2;
                    } else {
                        minX = x2;
                        maxX = x1;
                    }
                    while (cx < minX) {
                        cx += mapWidth;
                    }
                    while (cx > maxX) {
                        cx -= mapWidth;
                    }
                    g.child(Haeckel.SVG_NS, 'path').attr(Haeckel.SVG_NS, 'd', "M" + x1 + " " + p1.y + "Q" + cx + " " + midp.y + " " + x2 + " " + p2.y).attrs(Haeckel.SVG_NS, lineAttrs);
                }

                if (Haeckel.equal(source, target)) {
                    return;
                }
                var p1 = self.project(source), p2 = self.project(target), midp = self.project(Haeckel.geo.center([source, target]));
                if (Math.abs(p1.x - p2.x) > mapWidth / 2) {
                    if (p1.x < mapWidth / 2) {
                        curve(p1.x, p2.x - mapWidth);
                        curve(p1.x + mapWidth, p2.x);
                    } else {
                        curve(p1.x, p2.x + mapWidth);
                        curve(p1.x - mapWidth, p2.x);
                    }
                } else {
                    curve(p1.x, p2.x);
                }
            }

            function getTaxonCoords(taxon) {
                var coords = taxonToCoords[taxon.hash];
                if (coords === undefined) {
                    var regions = Haeckel.chr.states(matrix, taxon, Haeckel.GEO_CHARACTER);
                    if (regions && !regions.empty) {
                        taxonToCoords[taxon.hash] = coords = Haeckel.geo.center(regions);
                    } else {
                        var childCoords = [];
                        Haeckel.ext.each(solver.imSucs(taxon), function (child) {
                            return childCoords.push(getTaxonCoords(child));
                        });
                        coords = Haeckel.geo.center(childCoords);
                        if (!coords) {
                            throw new Error('No coordinates for taxon \"' + name(taxon) + '\".');
                        }
                    }
                    taxonToCoords[taxon.hash] = coords;
                }
                return coords;
            }

            function name(taxon) {
                return Haeckel.ext.list(Haeckel.nom.forTaxon(nomenclature, taxon)).join('/');
            }

            var self = this, matrix = this.occurrenceMatrix, solver = this.solver, mapWidth = this.mapArea.width, nomenclature = this.nomenclature, taxonToCoords = {}, g = parent.child(Haeckel.SVG_NS, 'g');
            Haeckel.ext.each(solver.vertices, getTaxonCoords);
            if (this.extensions) {
                Haeckel.ext.each(solver.vertices, function (taxon) {
                    var regions = Haeckel.chr.states(matrix, taxon, Haeckel.GEO_CHARACTER);
                    if (!regions || regions.size !== 1) {
                        var parentCoords = [];
                        Haeckel.ext.each(solver.imPrcs(taxon), function (parent) {
                            return parentCoords.push(getTaxonCoords(parent));
                        });
                        parentCoords.push(getTaxonCoords(taxon));
                        taxonToCoords[taxon.hash] = Haeckel.geo.center(parentCoords);
                    }
                });
            }
            Haeckel.ext.each(solver.vertices, function (taxon) {
                var coords = getTaxonCoords(taxon);
                if (_this.extensions) {
                    drawExtensions(coords, taxon, _this.lineAttrs(taxon, taxon, solver));
                }
                Haeckel.ext.each(solver.imSucs(taxon), function (child) {
                    drawLine(coords, getTaxonCoords(child), _this.lineAttrs(taxon, child, solver));
                }, _this);
            }, this);
            Haeckel.ext.each(solver.sources, function (taxon) {
                var p = _this.project(getTaxonCoords(taxon)), r = _this.rootRadius + 'px';
                g.child(Haeckel.SVG_NS, 'circle').attrs(Haeckel.SVG_NS, {
                    'cx': p.x + 'px',
                    'cy': p.y + 'px',
                    'r': r,
                    'fill': _this.color.hex,
                    'stroke': 'none'
                });
            }, this);
            return g;
        };
        return GeoPhyloChart;
    })();
    Haeckel.GeoPhyloChart = GeoPhyloChart;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.COUNT_CHARACTER = Haeckel.chr.createRange(Haeckel.RANGE_POS_INF, false, false);
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
    (function (rec) {
        function contains(r, p) {
            return r.x <= p.x && r.y <= p.y && r.x2 >= p.x && r.y2 >= p.y;
        }
        rec.contains = contains;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rec) {
        function overlap(a, b) {
            if (Haeckel.equal(a, b)) {
                return true;
            }
            return !(a.left > b.right || a.right < b.left || a.top > b.bottom || a.bottom < b.top);
        }
        rec.overlap = overlap;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rec) {
        function intersect(a, b) {
            if (Haeckel.equal(a, b)) {
                return a;
            }
            if (!Haeckel.rec.overlap(a, b)) {
                return Haeckel.EMPTY_SET;
            }
            return Haeckel.rec.createFromCoords(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.min(a.x2, b.x2), Math.min(a.y2, b.y2));
        }
        rec.intersect = intersect;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var MAX_RANDOM_ATTEMPTS = 32;

    var OUTSIDE_MINIMUM_STYLE = {
        'fill-opacity': '0.5'
    };

    var POINT_STYLE = {
        'fill': Haeckel.BLACK.hex,
        'fill-opacity': '1',
        'stroke-opacity': '0'
    };

    var RECT_STYLE = {
        'fill': Haeckel.BLACK.hex,
        'fill-opacity': '1',
        'stroke-opacity': '0'
    };

    var OccurrencePlotChart = (function (_super) {
        __extends(OccurrencePlotChart, _super);
        function OccurrencePlotChart() {
            _super.apply(this, arguments);
            this.radius = 1;
            this.random = Math.random;
        }
        OccurrencePlotChart.prototype.createPoint = function (builder, p, unit, withinMinimum) {
            var point = builder.child(Haeckel.SVG_NS, 'circle').attrs(Haeckel.SVG_NS, {
                'cx': p.x + 'px',
                'cy': p.y + 'px',
                'r': (withinMinimum ? this.radius : (this.radius / 2)) + 'px'
            }).attrs(Haeckel.SVG_NS, POINT_STYLE);
            if (!withinMinimum) {
                point.attrs(Haeckel.SVG_NS, OUTSIDE_MINIMUM_STYLE);
            }
        };

        OccurrencePlotChart.prototype.drawPoints = function (builder, plots, area, unit, count) {
            var min = count.min, max = count.max, point;
            for (var i = 0; i < max; ++i) {
                point = this.getIndividualPoint(plots, area);
                if (Haeckel.rec.contains(this.area, point)) {
                    this.createPoint(builder, point, unit, i < min);
                }
            }
        };

        OccurrencePlotChart.prototype.drawRect = function (builder, plots, area, unit) {
            area = Haeckel.rec.intersect(this.area, area);
            if (area.empty) {
                return;
            }
            var right = area.right, bottom = area.bottom, top = Math.floor(area.top), left = Math.floor(area.left);
            for (var x = left; x <= right; ++x) {
                for (var y = top; y <= bottom; ++y) {
                    var key = String(x) + "," + String(y);
                    plots[key] = true;
                }
            }
            builder.child(Haeckel.SVG_NS, 'rect').attrs(Haeckel.SVG_NS, {
                'height': Math.max(area.height, this.radius * 2) + 'px',
                'width': Math.max(area.width, this.radius * 2) + 'px',
                'x': area.left + 'px',
                'y': area.top + 'px',
                'rx': (area.width / 2) + 'px',
                'ry': (area.height / 2) + 'px'
            }).attrs(Haeckel.SVG_NS, RECT_STYLE);
        };

        OccurrencePlotChart.prototype.getIndividualPoint = function (plots, area) {
            var times = 0, x, y, w2 = area.width / 2, h2 = area.height / 2;
            do {
                var a = this.random() * Math.PI * 2, r = this.random();
                x = Math.round(area.centerX + Math.cos(a) * r * w2);
                y = Math.round(area.centerY + Math.sin(a) * r * h2);
                var key = String(x) + "," + String(y);
                if (plots[key]) {
                    times++;
                } else {
                    plots[key] = true;
                    break;
                }
            } while(times < MAX_RANDOM_ATTEMPTS);
            return Haeckel.pt.create(x, y);
        };

        OccurrencePlotChart.prototype.render = function (parent) {
            var _this = this;
            var g = parent.child(Haeckel.SVG_NS, 'g');
            if (this.time.size === 0 || this.area.area === 0) {
                return g;
            }

            var plots = {}, matrix = this.characterMatrix, area = this.area;

            Haeckel.ext.each(matrix.taxon.units, function (unit) {
                var occurrences = Haeckel.chr.states(matrix, unit, Haeckel.OCCURRENCE_CHARACTER);
                if (!Haeckel.isExtSet(occurrences)) {
                    var count = Haeckel.chr.states(matrix, unit, Haeckel.COUNT_CHARACTER);
                    if (Haeckel.isRange(count)) {
                        var time = Haeckel.chr.states(matrix, unit, Haeckel.TIME_CHARACTER);
                        occurrences = Haeckel.ext.create([Haeckel.occ.create(count, null, time)]);
                    } else {
                        occurrences = Haeckel.EMPTY_SET;
                    }
                }
                if (!occurrences.empty) {
                    var x = _this.getTaxonX(unit);
                    if (!x.empty) {
                        Haeckel.ext.each(occurrences, function (occurrence) {
                            var count = occurrence.count;
                            if (!count.empty && count.max > 0) {
                                var y = _this.getTimeY(occurrence.time);
                                if (!y.empty) {
                                    var rect = Haeckel.rec.createFromCoords(x.min, y.min, x.max, y.max);
                                    if (rect.area <= count.min) {
                                        _this.drawRect(g, plots, rect, unit);
                                    } else {
                                        _this.drawPoints(g, plots, rect, unit, count);
                                    }
                                }
                            }
                        }, _this);
                    }
                }
            }, this);

            return g;
        };
        return OccurrencePlotChart;
    })(Haeckel.ChronoCharChart);
    Haeckel.OccurrencePlotChart = OccurrencePlotChart;
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
    var PATH_STYLE = {
        "fill": Haeckel.BLACK.hex,
        "fill-opacity": "1",
        "stroke": Haeckel.BLACK.hex,
        "stroke-opacity": "1"
    };

    var PhyloChart = (function (_super) {
        __extends(PhyloChart, _super);
        function PhyloChart() {
            _super.apply(this, arguments);
        }
        PhyloChart.prototype.render = function (parent) {
            var _this = this;
            var solver = this.phyloSolver, graph = solver.graph, timeMatrixBuilder = new Haeckel.CharacterMatrixBuilder(), characterMatrix = this.characterMatrix;
            Haeckel.ext.each(graph.vertices, function (taxon) {
                return timeMatrixBuilder.states(taxon, Haeckel.TIME_CHARACTER, Haeckel.chr.states(characterMatrix, taxon, Haeckel.TIME_CHARACTER));
            });
            timeMatrixBuilder.inferStates(solver.dagSolver);
            var positions = {}, area = this.area;
            Haeckel.ext.each(graph.vertices, function (taxon) {
                return positions[taxon.hash] = _this.getTaxonRect(taxon);
            });
            var g = parent.child(Haeckel.SVG_NS, 'g');
            Haeckel.ext.each(graph.arcs, function (arc) {
                var source = positions[arc[0].hash], target = positions[arc[1].hash];
                if (!source || !target || source.empty || target.empty) {
                    return;
                }
                var data = "M" + source.centerX + " " + source.bottom + "L" + target.centerX + " " + target.bottom + "V" + target.top + "L" + source.centerX + " " + source.top + "V" + source.bottom + "Z";
                g.child(Haeckel.SVG_NS, 'path').attr(Haeckel.SVG_NS, 'd', data).attrs(Haeckel.SVG_NS, PATH_STYLE);
            });
            return g;
        };
        return PhyloChart;
    })(Haeckel.ChronoCharChart);
    Haeckel.PhyloChart = PhyloChart;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.EMPTY_DISTANCE_MATRIX = Object.freeze({ hashMap: Object.freeze({}), members: Haeckel.EMPTY_SET });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.WHITE = Object.freeze({
        b: 0xFF,
        error: false,
        g: 0xFF,
        hex: '#FFFFFF',
        r: 0xFF
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function precisionEqual(a, b) {
        return Math.round(a * Haeckel.PRECISION) / Haeckel.PRECISION === Math.round(b * Haeckel.PRECISION) / Haeckel.PRECISION;
    }
    Haeckel.precisionEqual = precisionEqual;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (dst) {
        function max(matrix) {
            var result = NaN, a, b;
            for (a in matrix.hashMap) {
                var row = matrix.hashMap[a];
                for (b in row) {
                    var max = row[b].max;
                    if (!isNaN(max)) {
                        if (isNaN(result)) {
                            result = max;
                        } else {
                            result = Math.max(max, result);
                        }
                    }
                }
            }
            return result;
        }
        dst.max = max;
    })(Haeckel.dst || (Haeckel.dst = {}));
    var dst = Haeckel.dst;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function distance(matrix, focus, taxon) {
            if (!matrix) {
                throw new Error('No distance matrix provided.');
            }
            if (!focus || !taxon || focus.empty || taxon.empty) {
                return Haeckel.EMPTY_SET;
            }
            var builder = new Haeckel.RangeBuilder;
            Haeckel.ext.each(focus.units, function (x) {
                Haeckel.ext.each(taxon.units, function (y) {
                    builder.addRange(Haeckel.dst.get(matrix, x, y));
                });
            });
            var range = builder.build();
            if (range.empty && !Haeckel.tax.intersect(focus, taxon).empty) {
                return Haeckel.RANGE_0;
            }
            return range;
        }
        tax.distance = distance;
    })(Haeckel.tax || (Haeckel.tax = {}));
    var tax = Haeckel.tax;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var BAR_STYLE = {
        "fill-opacity": '1',
        "stroke-opacity": '0'
    };

    var DEFAULT_BAR_SORT = function (a, b) {
        if (a === b) {
            return 0;
        }
        if (a.distance.mean === b.distance.mean) {
            var aNames = Haeckel.ext.list(a.names).sort().join("|"), bNames = Haeckel.ext.list(b.names).sort().join("|");
            if (aNames < bNames) {
                return -1;
            }
            if (aNames > bNames) {
                return 1;
            }
            return 0;
        }
        return b.distance.mean - a.distance.mean;
    };

    var DEFAULT_COLOR_MAP = function (taxon) {
        return Haeckel.BLACK;
    };

    function DEFAULT_LABELER(bar, rectangle, builder) {
    }

    var ProximityBarChart = (function () {
        function ProximityBarChart(id) {
            this.id = id;
            this.area = Haeckel.EMPTY_SET;
            this.barSort = DEFAULT_BAR_SORT;
            this.colorMap = DEFAULT_COLOR_MAP;
            this.distanceMatrix = Haeckel.EMPTY_DISTANCE_MATRIX;
            this.focus = Haeckel.EMPTY_SET;
            this.labeler = DEFAULT_LABELER;
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
            this.spacing = 1;
        }
        ProximityBarChart.prototype.getBars = function () {
            var _this = this;
            var bars = [], focus = this.focus, nomenclature = this.nomenclature, factor = 1 / Haeckel.dst.max(this.distanceMatrix);
            Haeckel.ext.each(this.taxa, function (taxon) {
                var distance = Haeckel.tax.distance(_this.distanceMatrix, focus, taxon);
                if (distance) {
                    bars.push({
                        distance: distance,
                        names: Haeckel.nom.forTaxon(nomenclature, taxon),
                        normalizedDistance: Haeckel.rng.multiply(distance, factor),
                        taxon: taxon
                    });
                }
            }, this);
            return bars.sort(this.barSort);
        };

        ProximityBarChart.prototype.renderBar = function (builder, defs, bar, index, barWidth) {
            if (bar.normalizedDistance.empty) {
                return;
            }
            var x = this.area.left + barWidth * index, yMin = this.area.top + bar.normalizedDistance.min * this.area.height, yMax = this.area.top + bar.normalizedDistance.max * this.area.height, yMid = (yMin + yMax) / 2, yBottom = this.area.bottom, color = this.colorMap(bar.taxon);
            if (yMin === yBottom) {
                yMin -= 1;
                yMax -= 1;
            }
            var rectangle = Haeckel.rec.create(x + this.spacing / 2, yMin, barWidth - this.spacing, yBottom - yMin), barGroup = builder.child(Haeckel.SVG_NS, 'g').attr(Haeckel.SVG_NS, 'id', this.id + '-bar-' + index), fill;
            if (rectangle.height > 0) {
                if (Haeckel.precisionEqual(yMin, yMax) && Haeckel.precisionEqual(yMin, this.area.top)) {
                    fill = '#000000';
                } else {
                    var gradientID = this.id + '-gradient-' + index, fillBuilder = new Haeckel.LinearGradientBuilder(defs(), gradientID);
                    fillBuilder.startOpacity = 0;
                    fillBuilder.start = color;
                    fillBuilder.end = color;
                    fillBuilder.add({
                        color: color,
                        opacity: 0,
                        ratio: (bar.normalizedDistance.min === bar.normalizedDistance.max) ? (bar.normalizedDistance.min - 1 / Haeckel.PRECISION) : bar.normalizedDistance.min
                    });
                    fillBuilder.add({
                        color: color,
                        opacity: 1,
                        ratio: bar.normalizedDistance.max
                    });
                    fillBuilder.build();
                    fill = 'url(#' + gradientID + ')';
                }
                barGroup.child(Haeckel.SVG_NS, 'rect').attrs(Haeckel.SVG_NS, {
                    'x': rectangle.x + 'px',
                    'y': this.area.top + 'px',
                    'width': rectangle.width + 'px',
                    'height': this.area.height + 'px',
                    'fill': fill
                }).attrs(Haeckel.SVG_NS, BAR_STYLE);
            }
            this.labeler(bar, rectangle, barGroup);
        };

        ProximityBarChart.prototype.render = function (parent, defs) {
            var g = parent.child(Haeckel.SVG_NS, 'g'), bars = this.getBars(), n = bars.length, i;
            if (n !== 0) {
                var barWidth = this.area.width / n;
                for (i = 0; i < n; ++i) {
                    this.renderBar(g, defs, bars[i], i, barWidth);
                }
            }
            return g;
        };
        return ProximityBarChart;
    })();
    Haeckel.ProximityBarChart = ProximityBarChart;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.TAU = Math.PI * 2;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        function add(a, b) {
            return Haeckel.pt.create(a.x + b.x, a.y + b.y);
        }
        pt.add = add;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        function distance(a, b) {
            return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        }
        pt.distance = distance;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        function furthest(source, points) {
            var n = points.length;
            if (n === 0) {
                return null;
            }
            if (n === 1) {
                return points[0];
            }
            var result = points[0], resultDistance = Haeckel.pt.distance(source, result), i = 1;
            while (i < n) {
                var p = points[i++], d = Haeckel.pt.distance(source, p);
                if (resultDistance < d) {
                    result = p;
                    resultDistance = d;
                }
            }
            return result;
        }
        pt.furthest = furthest;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        function nearest(source, points) {
            var n = points.length;
            if (n === 0) {
                return null;
            }
            if (n === 1) {
                return points[0];
            }
            var result = points[0], resultDistance = Haeckel.pt.distance(source, result), i = 1;
            while (i < n) {
                var p = points[i++], d = Haeckel.pt.distance(source, p);
                if (resultDistance > d) {
                    result = p;
                    resultDistance = d;
                }
            }
            return result;
        }
        pt.nearest = nearest;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
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
    (function (ray) {
        function create(origin, angle) {
            if (!Haeckel.isPoint(origin) || isNaN(origin.x) || isNaN(origin.y) || isNaN(angle)) {
                return Haeckel.EMPTY_SET;
            }
            angle = Haeckel.trg.normalize(angle);
            return Object.freeze({
                angle: angle,
                hash: "(" + origin.hash + "->" + angle + ")",
                origin: origin
            });
        }
        ray.create = create;
    })(Haeckel.ray || (Haeckel.ray = {}));
    var ray = Haeckel.ray;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (pt) {
        function angle(a, b) {
            return Haeckel.trg.normalize(Math.atan2(b.y - a.y, b.x - a.x));
        }
        pt.angle = angle;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ray) {
        function contains(ray, p) {
            if (isNaN(p.x) || isNaN(p.y) || ray.empty) {
                return false;
            }
            return Haeckel.precisionEqual(ray.angle, Haeckel.pt.angle(ray.origin, p));
        }
        ray.contains = contains;
    })(Haeckel.ray || (Haeckel.ray = {}));
    var ray = Haeckel.ray;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ray) {
        function intersectSegment(ray, segment) {
            if (!(segment.length >= 2)) {
                throw new Error("Not a line segment: " + segment + '.');
            }
            if (ray.empty) {
                return [];
            }
            if (Haeckel.ray.contains(ray, segment[0])) {
                if (Haeckel.ray.contains(ray, segment[1])) {
                    return segment;
                }
                return [segment[0]];
            } else if (Haeckel.ray.contains(ray, segment[1])) {
                return [segment[1]];
            }
            var x0 = segment[0].x, x1 = segment[1].x, y0 = segment[0].y, y1 = segment[1].y, a1 = Math.sin(ray.angle), b1 = -Math.cos(ray.angle), c1 = a1 * ray.origin.x + b1 * ray.origin.y, a2 = y1 - y0, b2 = x0 - x1, c2 = a2 * x0 + b2 * y0, det = a1 * b2 - a2 * b1;
            if (Math.round(det * Haeckel.PRECISION) / Haeckel.PRECISION === 0) {
                return [];
            }
            var point = Haeckel.pt.create((b2 * c1 - b1 * c2) / det, (a1 * c2 - a2 * c1) / det);
            if (point.x >= Math.min(x0, x1) - 1 / Haeckel.PRECISION && point.x <= Math.max(x0, x1) + 1 / Haeckel.PRECISION && point.y >= Math.min(y0, y1) - 1 / Haeckel.PRECISION && point.y <= Math.max(y0, y1) + 1 / Haeckel.PRECISION && Haeckel.ray.contains(ray, point)) {
                return [point];
            }
            return [];
        }
        ray.intersectSegment = intersectSegment;
    })(Haeckel.ray || (Haeckel.ray = {}));
    var ray = Haeckel.ray;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ray) {
        function intersectSegments(ray, segments) {
            var points = [];
            for (var i = 0, n = segments.length; i < n; ++i) {
                points = points.concat(Haeckel.ray.intersectSegment(ray, segments[i]));
            }
            return points;
        }
        ray.intersectSegments = intersectSegments;
    })(Haeckel.ray || (Haeckel.ray = {}));
    var ray = Haeckel.ray;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rec) {
        function combine(rectangles) {
            var n = rectangles.length;
            if (n === 0) {
                return Haeckel.EMPTY_SET;
            }
            if (n === 1) {
                return rectangles[0];
            }
            var x = NaN, y = NaN, x2 = NaN, y2 = NaN;
            for (var i = 0; i < n; ++i) {
                var r = rectangles[i];
                if (!r.empty) {
                    x = isNaN(x) ? r.x : Math.min(x, r.x);
                    y = isNaN(y) ? r.y : Math.min(y, r.y);
                    x2 = isNaN(x2) ? r.x2 : Math.max(x2, r.x2);
                    y2 = isNaN(y2) ? r.y2 : Math.max(y2, r.y2);
                }
            }
            if (isNaN(x) || isNaN(y) || isNaN(x2) || isNaN(y2)) {
                return Haeckel.EMPTY_SET;
            }
            return Haeckel.rec.createFromCoords(x, y, x2, y2);
        }
        rec.combine = combine;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rec) {
        function segments(rects) {
            var segments = [];
            for (var i = 0, n = rects.length; i < n; ++i) {
                var rect = rects[i];
                if (!rect.empty) {
                    segments.push([Haeckel.pt.create(rect.x, rect.y), Haeckel.pt.create(rect.x2, rect.y)]);
                    segments.push([Haeckel.pt.create(rect.x2, rect.y), Haeckel.pt.create(rect.x2, rect.y2)]);
                    segments.push([Haeckel.pt.create(rect.x2, rect.y2), Haeckel.pt.create(rect.x, rect.y2)]);
                    segments.push([Haeckel.pt.create(rect.x, rect.y2), Haeckel.pt.create(rect.x, rect.y)]);
                }
            }
            return segments;
        }
        rec.segments = segments;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
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
    (function (vec) {
        function create(radians, distance) {
            radians = Haeckel.trg.normalize(radians);
            if (isNaN(distance)) {
                distance = 0;
            }
            return Object.freeze({
                angle: radians,
                distance: distance,
                hash: "(" + String(radians) + "->" + String(distance) + ")"
            });
        }
        vec.create = create;
    })(Haeckel.vec || (Haeckel.vec = {}));
    var vec = Haeckel.vec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (vec) {
        function point(v) {
            return Haeckel.pt.create(Math.cos(v.angle) * v.distance, Math.sin(v.angle) * v.distance);
        }
        vec.point = point;
    })(Haeckel.vec || (Haeckel.vec = {}));
    var vec = Haeckel.vec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    function condensePoints(points, threshold) {
        if (typeof threshold === "undefined") { threshold = 0; }
        var n = points.length;
        if (n <= 1) {
            return points;
        }
        var last = points[0], condensed = [last];
        for (var i = 1; i < n; ++i) {
            var point = points[i];
            if (Haeckel.pt.distance(point, last) > threshold) {
                condensed.push(point);
                last = point;
            }
        }
        return condensed;
    }

    function points2path(points, threshold) {
        if (typeof threshold === "undefined") { threshold = 0; }
        var points = condensePoints(points, threshold), n = points.length;
        if (n === 0) {
            return "";
        }
        var prev = points[0], origin = prev.x + " " + prev.y, path = "M" + origin;
        for (var i = 1; i < n; ++i) {
            var p = points[i];
            path += "Q" + prev.x + " " + prev.y + " " + p.x + " " + p.y;
            prev = p;
        }
        path += "Q" + prev.x + " " + prev.y + " " + origin + "Z";
        return path;
    }

    function smooth(vectors) {
        var n = vectors.length, smoothed = new Array(n);
        for (var i = 0; i < n; ++i) {
            var v = vectors[i], va = (i === 0) ? vectors[n - 1] : vectors[i - 1], vb = (i === n - 1) ? vectors[0] : vectors[i + 1];
            smoothed[i] = Haeckel.vec.create(v.angle, (v.distance + va.distance + vb.distance) / 3);
        }
        return smoothed;
    }

    var RegionChart = (function (_super) {
        __extends(RegionChart, _super);
        function RegionChart() {
            _super.apply(this, arguments);
            this.margin = 12;
            this.minPointDistance = 1;
            this.pointsPerRegion = 12;
            this.smoothing = 2;
            this.shapeAttrFunction = null;
            this.shapeAttrs = {
                'fill-opacity': '0',
                'stroke': Haeckel.BLACK.hex,
                'stroke-width': '0.5',
                'stroke-dasharray': '1,4'
            };
            this.taxa = [];
        }
        RegionChart.prototype.addMargins = function (rect) {
            var m = this.margin;
            if (m === 0 || isNaN(m)) {
                return rect;
            }
            return Haeckel.rec.create(rect.x - m, rect.y - m, rect.width + 2 * m, rect.height + 2 * m);
        };

        RegionChart.prototype.getRegions = function () {
            var _this = this;
            var regions = [], matrix = this.characterMatrix;
            for (var i = 0, n = this.taxa.length; i < n; ++i) {
                var taxon = this.taxa[i].taxon, type = this.taxa[i].type, rectangles = [];
                if (!Haeckel.isTaxic(type)) {
                    type = taxon;
                }
                Haeckel.ext.each(taxon.units, function (unit) {
                    var occurrences = Haeckel.chr.states(matrix, unit, Haeckel.OCCURRENCE_CHARACTER);
                    if (!Haeckel.isExtSet(occurrences)) {
                        var time = Haeckel.chr.states(matrix, unit, Haeckel.TIME_CHARACTER);
                        occurrences = Haeckel.ext.create([Haeckel.occ.create(null, null, time)]);
                    }
                    if (!occurrences.empty) {
                        var x = _this.getTaxonX(unit);
                        if (!x.empty) {
                            Haeckel.ext.each(occurrences, function (occurrence) {
                                var y = _this.getTimeY(occurrence.time);
                                if (!y.empty) {
                                    var rect = Haeckel.rec.createFromCoords(x.min, y.min, x.max, y.max);
                                    if (!rect.empty) {
                                        rectangles.push(_this.addMargins(rect));
                                    }
                                }
                            }, _this);
                        }
                    }
                }, this);
                if (rectangles.length > 0) {
                    regions.push({
                        rectangles: rectangles,
                        taxon: taxon,
                        typeRect: this.getTaxonRect(type)
                    });
                }
            }
            return regions;
        };

        RegionChart.prototype.render = function (parent) {
            var g = parent.child(Haeckel.SVG_NS, 'g'), regions = this.getRegions();
            for (var i = 0, n = regions.length; i < n; ++i) {
                var region = regions[i], rectangle = Haeckel.rec.combine(region.rectangles);
                if (rectangle.empty) {
                    continue;
                }
                var segments = Haeckel.rec.segments(region.rectangles), origin = Haeckel.pt.create(region.typeRect.centerX, region.typeRect.centerY), p = this.pointsPerRegion, vectors = [];
                for (var j = 0; j < p; ++j) {
                    var angle = Haeckel.TAU * j / p, r = Haeckel.ray.create(origin, angle), candidates = Haeckel.ray.intersectSegments(r, segments), point;
                    if (candidates.length === 0) {
                        r = Haeckel.ray.create(origin, angle + Math.PI);
                        candidates = Haeckel.ray.intersectSegments(r, segments);
                        point = Haeckel.pt.nearest(origin, candidates);
                    } else {
                        point = Haeckel.pt.furthest(origin, candidates);
                    }
                    if (!Haeckel.isPoint(point)) {
                        continue;
                    }
                    vectors.push(Haeckel.vec.create(angle, Haeckel.pt.distance(origin, point)));
                }
                p = vectors.length;
                if (p > 0) {
                    for (j = 0; j < this.smoothing; ++j) {
                        vectors = smooth(vectors);
                    }
                    var points = new Array(p);
                    for (j = 0; j < p; ++j) {
                        points[j] = Haeckel.pt.add(origin, Haeckel.vec.point(vectors[j]));
                    }
                    var regionGroup = g.child(Haeckel.SVG_NS, 'g'), shape = regionGroup.child(Haeckel.SVG_NS, 'path').attr(Haeckel.SVG_NS, 'd', points2path(points, this.minPointDistance)), attrs = (typeof this.shapeAttrFunction === 'function') ? this.shapeAttrFunction(region.taxon) : this.shapeAttrs;
                    shape.attrs(Haeckel.SVG_NS, attrs);
                    if (typeof this.labels === "function") {
                        var label = this.labels(region.taxon);
                        if (label) {
                            r = Haeckel.ray.create(origin, label.angle);
                            candidates = Haeckel.ray.intersectSegments(r, segments);
                            point = Haeckel.pt.furthest(origin, candidates);
                            if (!Haeckel.isPoint(point)) {
                                point = origin;
                            }
                            var labelGroup = regionGroup.child(Haeckel.SVG_NS, 'g'), textBox = labelGroup.child(Haeckel.SVG_NS, 'rect').attrs(Haeckel.SVG_NS, {
                                'fill': Haeckel.WHITE.hex,
                                'fill-opacity': '1'
                            }), text = labelGroup.child(Haeckel.SVG_NS, 'text').attr(Haeckel.SVG_NS, 'x', point.x + 'px').attr(Haeckel.SVG_NS, 'y', point.y + 'px').text(label.label).attrs(Haeckel.SVG_NS, label.attrs), box = text.build().getBBox(), rpx = (Math.min(box.width, box.height) / 2) + 'px';
                            textBox.attrs(Haeckel.SVG_NS, {
                                'height': box.height + 'px',
                                'rx': rpx,
                                'ry': rpx,
                                'stroke-opacity': '0',
                                'width': box.width + 'px',
                                'x': box.x + 'px',
                                'y': box.y + 'px'
                            });
                        }
                    }
                }
            }
            return g;
        };
        return RegionChart;
    })(Haeckel.ChronoCharChart);
    Haeckel.RegionChart = RegionChart;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function compare(a, b) {
            if (a.empty) {
                return b.empty ? NaN : -1;
            }
            if (b.empty) {
                return 1;
            }
            return a.mean - b.mean;
        }
        rng.compare = compare;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
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
    var BAR_STYLE = {
        'stroke-opacity': '1',
        'stroke': '#000000',
        'stroke-dasharray': '1,4'
    };

    var StratChart = (function (_super) {
        __extends(StratChart, _super);
        function StratChart() {
            _super.apply(this, arguments);
            this.minStrokeWidth = 0.5;
            this.strata = Haeckel.EMPTY_SET;
            this.type = null;
        }
        StratChart.prototype.render = function (parent) {
            var _this = this;
            var strata = [], yRange = Haeckel.rng.create(this.area.top, this.area.bottom), boundaries = new Haeckel.ExtSetBuilder(), y;
            Haeckel.ext.each(this.strata, function (stratum) {
                if (_this.type === null || _this.type === stratum.type) {
                    y = _this.getTimeY(stratum.start);
                    if (Haeckel.rng.overlap(yRange, y)) {
                        boundaries.add(y);
                    }
                    y = _this.getTimeY(stratum.end);
                    if (Haeckel.rng.overlap(yRange, y)) {
                        boundaries.add(y);
                    }
                }
            }, this);
            var g = parent.child(Haeckel.SVG_NS, 'g'), boundaryList = Haeckel.ext.list(boundaries.build()).sort(Haeckel.rng.compare);
            Haeckel.arr.each(boundaryList, function (boundary) {
                var line = g.child(Haeckel.SVG_NS, 'path').attr(Haeckel.SVG_NS, 'd', 'M' + _this.area.left + " " + boundary.mean + "h" + _this.area.width).attrs(Haeckel.SVG_NS, BAR_STYLE).attr(Haeckel.SVG_NS, 'stroke-width', Math.max(_this.minStrokeWidth, boundary.size) + 'px');
            }, this);
            return g;
        };
        return StratChart;
    })(Haeckel.ChronoChart);
    Haeckel.StratChart = StratChart;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var StratLabeler = (function () {
        function StratLabeler() {
            this.fontSize = 12;
            this.margin = 12;
        }
        StratLabeler.prototype.render = function (parent) {
            var _this = this;
            var g = parent.child(Haeckel.SVG_NS, 'g'), chart = this.chart, yRange = Haeckel.rng.create(chart.area.top, chart.area.bottom), x = chart.area.right - this.margin, type = chart.type;
            Haeckel.ext.each(this.chart.strata, function (stratum) {
                if (type !== null && stratum.type !== type) {
                    return;
                }
                var time = Haeckel.rng.create(stratum.start.mean, stratum.end.mean), y = Haeckel.rng.constrain(chart.getTimeY(time), yRange), label = g.child(Haeckel.SVG_NS, 'text').attrs(Haeckel.SVG_NS, {
                    'x': x + 'px',
                    'y': y.mean + 'px',
                    'text-anchor': 'middle',
                    'font-size': _this.fontSize + 'px',
                    'transform': 'rotate(90)'
                }).text(stratum.name), box = label.build().getBBox();
                if (y.size < box.height) {
                    label.detach();
                }
            }, this);
            return g;
        };
        return StratLabeler;
    })();
    Haeckel.StratLabeler = StratLabeler;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.VECTOR_0 = Object.freeze({ angle: 0, distance: 0, hash: "(0->0)" });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DEFAULT_NAME_VECTOR_MAP = function (name) {
        return Haeckel.VECTOR_0;
    };

    var DEFAULT_SIZE_MAP = function (area) {
        return 12;
    };

    var LABEL_STYLE = { "text-anchor": "middle" };

    var VectorChronoLabeler = (function () {
        function VectorChronoLabeler() {
            this.nameVectorMap = DEFAULT_NAME_VECTOR_MAP;
            this.names = Haeckel.EMPTY_SET;
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
            this.sizeMap = DEFAULT_SIZE_MAP;
        }
        VectorChronoLabeler.prototype.render = function (parent) {
            var _this = this;
            var g = parent.child(Haeckel.SVG_NS, 'g');
            if (this.chart === null) {
                return g;
            }
            Haeckel.ext.each(this.names, function (name) {
                var taxon = _this.nomenclature.nameMap[name];
                if (!taxon || taxon.empty) {
                    return;
                }
                var rectangles = [];
                Haeckel.ext.each(taxon.units, function (unit) {
                    rectangles.push(this.chart.getTaxonRect(unit));
                }, _this);
                var rectangle = Haeckel.rec.combine(rectangles);

                if (!rectangle.empty) {
                    var x = rectangle.centerX, y = rectangle.centerY, offset = Haeckel.vec.point(_this.nameVectorMap(name)), size = _this.sizeMap(rectangle.area);
                    if (!isFinite(size)) {
                        size = 12;
                    }
                    x += offset.x;
                    y += offset.y;
                    g.child(Haeckel.SVG_NS, 'text').attrs(Haeckel.SVG_NS, {
                        'x': x + 'px',
                        'y': y + 'px',
                        'font-size': size + 'px'
                    }).attrs(Haeckel.SVG_NS, LABEL_STYLE).text(name);
                }
            }, this);
            return g;
        };
        return VectorChronoLabeler;
    })();
    Haeckel.VectorChronoLabeler = VectorChronoLabeler;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.BIT_MEMBER_MAX = 31;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.EMPTY_MAP = Object.freeze(function (value) {
        return undefined;
    });
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.EMPTY_PHYLO_SOLVER = new Haeckel.PhyloSolver(Haeckel.EMPTY_DAG_SOLVER);
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.RAD_TO_DEG = 180 / Math.PI;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    Haeckel.XLINK_NS = "http://www.w3.org/1999/xlink";
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
    (function (dst) {
        function axes(matrix) {
            if (matrix.members.size < 2) {
                return [];
            }
            var axes = [], members = Haeckel.ext.list(matrix.members), l = members.length;
            for (var i = 0, n = l - 1; i < n; ++i) {
                var a = members[i];
                for (var j = i + 1; j < l; ++j) {
                    var b = members[j], ab = Haeckel.dst.get(matrix, a, b);
                    if (ab !== undefined) {
                        axes.push(Object.freeze({ distance: ab, endpoints: Haeckel.ext.create([a, b]) }));
                    }
                }
            }
            return axes.sort(function (a, b) {
                return b.distance.mean - a.distance.mean;
            });
        }
        dst.axes = axes;
    })(Haeckel.dst || (Haeckel.dst = {}));
    var dst = Haeckel.dst;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (dst) {
        function list(matrix, focus) {
            var entries = [];
            Haeckel.ext.each(matrix.members, function (member) {
                var entry = {
                    distance: Haeckel.dst.get(matrix, focus, member),
                    item: member
                };
                entries.push(Object.freeze(entry));
            });
            return entries.sort(function (a, b) {
                return a.distance.mean - b.distance.mean;
            });
        }
        dst.list = list;
    })(Haeckel.dst || (Haeckel.dst = {}));
    var dst = Haeckel.dst;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (dst) {
        function mapAround(matrix, focus) {
            return function (element) {
                return Haeckel.dst.get(matrix, focus, element);
            };
        }
        dst.mapAround = mapAround;
    })(Haeckel.dst || (Haeckel.dst = {}));
    var dst = Haeckel.dst;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (dst) {
        function normalize(matrix) {
            var a, b, sourceRow, targetRow, ranges = [];
            for (a in matrix.hashMap) {
                sourceRow = matrix.hashMap[a];
                for (b in sourceRow) {
                    ranges.push(sourceRow[b]);
                }
            }
            var totalRange = Haeckel.rng.combine(ranges);
            if (!totalRange) {
                return Haeckel.EMPTY_DISTANCE_MATRIX;
            }
            var hashMap = {}, offset = -totalRange.min, factor = (totalRange.size === 0) ? 0 : (1 / totalRange.size);
            for (a in matrix.hashMap) {
                targetRow = {};
                sourceRow = matrix.hashMap[a];
                for (b in sourceRow) {
                    var r = sourceRow[b];
                    targetRow[b] = Haeckel.rng.multiply(Haeckel.rng.add(r, offset), factor);
                }
                hashMap[a] = Object.freeze(targetRow);
            }
            return Object.freeze({
                hashMap: Object.freeze(hashMap),
                members: matrix.members
            });
        }
        dst.normalize = normalize;
    })(Haeckel.dst || (Haeckel.dst = {}));
    var dst = Haeckel.dst;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function forAll(set, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            if (set.size === Infinity) {
                throw new Error('Cannot traverse domain sets.');
            }
            for (var h in set.hashMap) {
                if (!f.call(thisObject, set.hashMap[h])) {
                    return false;
                }
            }
            return true;
        }
        ext.forAll = forAll;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function forSome(set, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            if (set.size === Infinity) {
                throw new Error('Cannot traverse domain sets.');
            }
            for (var h in set.hashMap) {
                if (f.call(thisObject, set.hashMap[h])) {
                    return true;
                }
            }
            return false;
        }
        ext.forSome = forSome;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function map(set, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            if (set.size === Infinity) {
                throw new Error('Cannot traverse domain sets.');
            }
            var builder = new Haeckel.ExtSetBuilder(), h;
            for (h in set.hashMap) {
                builder.add(f.call(thisObject, set.hashMap[h]));
            }
            return builder.build();
        }
        ext.map = map;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function prIncludes(a, b) {
            if (a.hash === b.hash) {
                return false;
            }
            if (b.size >= a.size) {
                return false;
            }
            if (a.size === Infinity) {
                return b.size !== Infinity;
            }
            for (var h in b.hashMap) {
                if (a.hashMap[h] === undefined) {
                    return false;
                }
            }
            return true;
        }
        ext.prIncludes = prIncludes;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ext) {
        function where(set, f, thisObject) {
            if (typeof thisObject === "undefined") { thisObject = null; }
            if (set.size === Infinity) {
                throw new Error('Cannot traverse domain sets.');
            }
            var builder = new Haeckel.ExtSetBuilder();
            for (var h in set.hashMap) {
                var element = set.hashMap[h];
                if (f.call(thisObject, element)) {
                    builder.add(element);
                }
            }
            return builder.build();
        }
        ext.where = where;
    })(Haeckel.ext || (Haeckel.ext = {}));
    var ext = Haeckel.ext;
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
    (function (fig) {
        var XMLNS_NS = 'http://www.w3.org/2000/xmlns/';

        var PNGAssetsImpl = (function () {
            function PNGAssetsImpl() {
                this.base64Dict = {};
            }
            PNGAssetsImpl.prototype.image = function (builder, filename) {
                var data = this.base64Dict[filename];
                if (!data) {
                    throw new Error('Cannot find PNG data for "' + filename + '".');
                }
                return builder.child(Haeckel.SVG_NS, 'image').attr(Haeckel.SVG_NS, 'preserveAspectRatio', 'none').attr('xlink:href', 'data:image/png;base64,' + data);
            };
            return PNGAssetsImpl;
        })();

        function render(figure, document, files, serializer) {
            function initDefs() {
                if (!defs) {
                    defs = elementBuilder.child(Haeckel.SVG_NS, 'defs');
                }
                return defs;
            }

            function addPNGDef(filename, data) {
                initDefs();
                defs.child(Haeckel.SVG_NS, 'image').attrs(Haeckel.SVG_NS, {
                    id: filename,
                    preserveAspectRatio: 'none'
                }).attr('xlink:href', 'data:image/png;base64,' + data);
            }

            function addSVGDef(filename, data) {
                initDefs();
                if (!parser) {
                    parser = new DOMParser();
                }
                var svgDocument = parser.parseFromString(data, 'image/svg+xml'), svg = svgDocument.rootElement.cloneNode(true);
                svg.setAttribute('id', filename);
                if (!svg.hasAttribute('viewBox')) {
                    var width = svg.width.baseVal, height = svg.height.baseVal;
                    width.convertToSpecifiedUnits(5);
                    height.convertToSpecifiedUnits(5);
                    svg.setAttribute('viewBox', [0, 0, width.value, height.value].join(' '));
                }

                var xmlns = {}, n = svg.attributes.length, name, uri;
                for (var i = 0; i < n; ++i) {
                    var attr = svg.attributes.item(i);
                    if (attr.namespaceURI === XMLNS_NS && attr.localName !== 'xmlns') {
                        xmlns[attr.value] = attr.localName;
                    }
                }
                for (i = 0; i < n; ++i) {
                    attr = svg.attributes.item(i);
                    if (name = xmlns[attr.namespaceURI]) {
                        svg.removeAttributeNS(attr.namespaceURI, attr.localName);
                        svg.setAttribute(name + ':' + attr.localName, attr.value);
                    }
                }
                for (uri in xmlns) {
                    var name = xmlns[uri];
                    svg.removeAttributeNS(XMLNS_NS, name);
                    svg.setAttribute('xmlns:' + name, uri);
                }

                defs.build().appendChild(svg);
            }

            var dataSourcesReader = new Haeckel.DataSourcesReader(), dataSources = dataSourcesReader.read(files, figure.sources), i, n, filename, elementBuilder = new Haeckel.ElementBuilder(document, Haeckel.SVG_NS, 'svg').attrs({
                xmlns: Haeckel.SVG_NS,
                "xmlns:xlink": Haeckel.XLINK_NS
            }).attrs(Haeckel.SVG_NS, {
                width: figure.width + 'px',
                height: figure.height + 'px',
                version: '1.2',
                viewBox: '0 0 ' + figure.width + ' ' + figure.height
            }), defs, parser, pngAssets = new PNGAssetsImpl;
            document.body.appendChild(elementBuilder.build());
            if (figure.assets) {
                if (figure.assets.png) {
                    for (i = 0, n = figure.assets.png.length; i < n; ++i) {
                        filename = figure.assets.png[i];
                        pngAssets.base64Dict[filename] = files.base64[filename];
                    }
                }
                if (figure.assets.svg) {
                    for (i = 0, n = figure.assets.svg.length; i < n; ++i) {
                        filename = figure.assets.svg[i];
                        addSVGDef(filename, files.text[filename]);
                    }
                }
            }
            figure.render(elementBuilder, dataSources, initDefs, pngAssets);
            var svg = elementBuilder.build();
            document.body.appendChild(svg);
            return '<?xml version="1.0" encoding="UTF-8"?>' + serializer.serializeToString(svg);
        }
        fig.render = render;
    })(Haeckel.fig || (Haeckel.fig = {}));
    var fig = Haeckel.fig;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ist) {
        function contains(set, element) {
            return set.criterion(element);
        }
        ist.contains = contains;
    })(Haeckel.ist || (Haeckel.ist = {}));
    var ist = Haeckel.ist;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ist) {
        function intersect(a, b) {
            if (a.empty || b.empty) {
                return Haeckel.EMPTY_SET;
            }
            if (Haeckel.equal(a, b)) {
                return a;
            }
            return Haeckel.ist.create(function (element) {
                return a.criterion(element) && b.criterion(element);
            });
        }
        ist.intersect = intersect;
    })(Haeckel.ist || (Haeckel.ist = {}));
    var ist = Haeckel.ist;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (ist) {
        function setDiff(minuend, subtrahend) {
            if (minuend.empty) {
                return Haeckel.EMPTY_SET;
            }
            if (subtrahend.empty) {
                return minuend;
            }
            if (Haeckel.equal(minuend, subtrahend)) {
                return Haeckel.EMPTY_SET;
            }
            return Haeckel.ist.create(function (element) {
                return minuend.criterion(element) && !subtrahend.criterion(element);
            });
        }
        ist.setDiff = setDiff;
    })(Haeckel.ist || (Haeckel.ist = {}));
    var ist = Haeckel.ist;
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
    (function (nom) {
        function forSubtaxa(nomenclature, taxon) {
            if (taxon.empty) {
                return Haeckel.EMPTY_SET;
            }
            var builder = new Haeckel.ExtSetBuilder();
            Haeckel.ext.each(nomenclature.names, function (name) {
                var nameTaxon = nomenclature.nameMap[name];
                if (Haeckel.tax.includes(taxon, nameTaxon)) {
                    builder.add(name);
                }
            });
            return builder.build();
        }
        nom.forSubtaxa = forSubtaxa;
    })(Haeckel.nom || (Haeckel.nom = {}));
    var nom = Haeckel.nom;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function intersect(a, b) {
            if (!a || !b || !Haeckel.rng.overlap(a, b)) {
                return Haeckel.EMPTY_SET;
            }
            if (a.hash === b.hash) {
                return a;
            }
            return Haeckel.rng.create(Math.max(a.min, b.min), Math.min(a.max, b.max));
        }
        rng.intersect = intersect;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (occ) {
        function timeSlice(time, occurrences) {
            var sliceBuilder = new Haeckel.ExtSetBuilder();
            if (occurrences && !occurrences.empty) {
                Haeckel.ext.each(occurrences, function (occurrence) {
                    var intersectTime = Haeckel.rng.intersect(time, occurrence.time);
                    if (!intersectTime.empty) {
                        var ratio = (occurrence.time.size === 0) ? 1 : (intersectTime.size / occurrence.time.size), intersectCount = (ratio === 1) ? occurrence.count : Haeckel.rng.multiply(occurrence.count, ratio);
                        sliceBuilder.add(Haeckel.occ.create(intersectCount, occurrence.geo, intersectTime));
                    }
                });
            }
            return sliceBuilder.build();
        }
        occ.timeSlice = timeSlice;
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
    (function (pt) {
        function equal(a, b) {
            return Haeckel.precisionEqual(a.x, b.x) && Haeckel.precisionEqual(a.y, b.y);
        }
        pt.equal = equal;
    })(Haeckel.pt || (Haeckel.pt = {}));
    var pt = Haeckel.pt;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rec) {
        function createFromBBox(svg) {
            var rect = svg.getBBox();
            return Haeckel.rec.create(rect.x, rect.y, rect.width, rect.height);
        }
        rec.createFromBBox = createFromBBox;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rec) {
        function createFromPoints(a, b) {
            var x = Math.min(a.x, b.x), y = Math.min(a.y, b.y), width = Math.max(a.x, b.x) - x, height = Math.max(a.y, b.y) - y;
            return Haeckel.rec.create(x, y, width, height);
        }
        rec.createFromPoints = createFromPoints;
    })(Haeckel.rec || (Haeckel.rec = {}));
    var rec = Haeckel.rec;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function contains(r, n) {
            if (r.empty) {
                return false;
            }
            return n >= r.min && n <= r.max;
        }
        rng.contains = contains;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function includes(superset, subset) {
            if (subset.empty) {
                return true;
            }
            if (superset.empty) {
                return false;
            }
            return subset.min >= superset.min && subset.max <= superset.max;
        }
        rng.includes = includes;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (rng) {
        function prIncludes(superset, subset) {
            if (subset.empty) {
                return !superset.empty;
            }
            if (superset.empty || Haeckel.equal(superset, subset)) {
                return false;
            }
            return (subset.min >= superset.min && subset.max <= superset.max);
        }
        rng.prIncludes = prIncludes;
    })(Haeckel.rng || (Haeckel.rng = {}));
    var rng = Haeckel.rng;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (tax) {
        function prIncludes(a, b) {
            return Haeckel.ext.prIncludes(a.entities, b.entities);
        }
        tax.prIncludes = prIncludes;
    })(Haeckel.tax || (Haeckel.tax = {}));
    var tax = Haeckel.tax;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (typ) {
        function contains(set, element) {
            return !set.empty;
        }
        typ.contains = contains;
    })(Haeckel.typ || (Haeckel.typ = {}));
    var typ = Haeckel.typ;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    (function (typ) {
        function create(typeObject) {
            var s = {
                contains: function (x) {
                    return true;
                },
                empty: false,
                hash: '{x:' + Haeckel.hash(typeObject) + '(x)}'
            };
            return Object.freeze(s);
        }
        typ.create = create;
    })(Haeckel.typ || (Haeckel.typ = {}));
    var typ = Haeckel.typ;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var CharacterScoresWriter = (function () {
        function CharacterScoresWriter() {
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
        }
        CharacterScoresWriter.prototype.getName = function (taxon) {
            if (taxon.empty) {
                return null;
            }
            var names = Haeckel.nom.forTaxon(this.nomenclature, taxon);
            if (names.empty) {
                return null;
            }
            var list = Haeckel.ext.list(names);
            list.sort();
            return list[0];
        };

        CharacterScoresWriter.prototype.write = function (matrix) {
            var _this = this;
            function getCharacterType() {
                if (Haeckel.arr.forAll(matrix.characterList, function (character) {
                    return Haeckel.isRange(character.domain);
                })) {
                    return "range";
                }
                if (Haeckel.arr.forAll(matrix.characterList, function (character) {
                    return Haeckel.isBitSet(character.domain) || Haeckel.isExtSet(character.domain);
                })) {
                    return "discrete";
                }
                throw new Error("Characters are not of a consistent recognized type; cannot be written as a scored matrix.");
            }

            var result = {
                characterType: getCharacterType(),
                scores: {}
            };

            Haeckel.arr.each(matrix.characterList, function (character) {
                if (typeof character.writeStates !== "function") {
                    console.warn('Character has no method for writing. Output will be null.', character);
                }
            });

            Haeckel.ext.each(matrix.taxon.units, function (unit) {
                var name = _this.getName(unit), row = [];
                if (name === null) {
                    console.warn('Unnamed taxon; cannot write.', unit);
                    return;
                }
                Haeckel.arr.each(matrix.characterList, function (character) {
                    if (typeof character.writeStates !== "function") {
                        row.push(null);
                    } else {
                        var states = Haeckel.chr.states(matrix, unit, character);
                        row.push(character.writeStates(states));
                    }
                });
                result.scores[name] = row;
            }, this);
            return result;
        };
        return CharacterScoresWriter;
    })();
    Haeckel.CharacterScoresWriter = CharacterScoresWriter;
})(Haeckel || (Haeckel = {}));
var Haeckel;
(function (Haeckel) {
    var DistanceMatrixWriter = (function () {
        function DistanceMatrixWriter() {
            this.nomenclature = Haeckel.EMPTY_NOMENCLATURE;
        }
        DistanceMatrixWriter.prototype.getName = function (taxon) {
            if (taxon.empty) {
                return null;
            }
            var names = Haeckel.nom.forTaxon(this.nomenclature, taxon);
            if (names.empty) {
                return null;
            }
            var list = Haeckel.ext.list(names);
            list.sort();
            return list[0];
        };

        DistanceMatrixWriter.prototype.write = function (matrix) {
            var _this = this;
            var result = [];
            Haeckel.ext.each(matrix.members, function (x) {
                var xName = _this.getName(x);
                if (xName === null) {
                    console.warn('Unnamed taxon; cannot write.');
                } else {
                    Haeckel.ext.each(matrix.members, function (y) {
                        var yName = (x === y) ? xName : _this.getName(y);
                        if (yName !== null) {
                            var distance = Haeckel.dst.get(matrix, x, y);
                            if (distance.empty) {
                                return;
                            }
                            if (x === y && distance.size === 0 && distance.min === 0) {
                                return;
                            }
                            result.push({
                                names: [xName, yName],
                                distance: Haeckel.rng.write(distance)
                            });
                        }
                    }, _this);
                }
            }, this);
            return result;
        };
        return DistanceMatrixWriter;
    })();
    Haeckel.DistanceMatrixWriter = DistanceMatrixWriter;
})(Haeckel || (Haeckel = {}));
