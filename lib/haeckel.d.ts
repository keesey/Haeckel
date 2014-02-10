declare module Haeckel {
    function hash(object: any): string;
}
declare module Haeckel {
    interface Builder<T> {
        build(): T;
        reset(): Builder<T>;
    }
}
declare module Haeckel {
    interface Model {
        hash: string;
    }
    function isModel(o: Model): boolean;
}
declare module Haeckel {
    interface Set extends Haeckel.Model {
        empty: boolean;
    }
    function isSet(o: Set): boolean;
}
declare module Haeckel {
    interface ExtSet<T> extends Haeckel.Set {
        hashMap: {
            [hash: string]: T;
        };
        size: number;
    }
    function isExtSet(o: ExtSet<any>): boolean;
}
declare module Haeckel {
    class ExtSetBuilder<T> implements Haeckel.Builder<Haeckel.ExtSet<T>> {
        private _hashMap;
        public add(...elements: T[]): ExtSetBuilder<T>;
        public addList(elements: T[]): ExtSetBuilder<T>;
        public addSet(elements: Haeckel.ExtSet<T>): ExtSetBuilder<T>;
        public build(): Haeckel.ExtSet<T>;
        public contains(element: T): boolean;
        public remove(...elements: T[]): ExtSetBuilder<T>;
        public removeList(elements: T[]): ExtSetBuilder<T>;
        public removeSet(elements: Haeckel.ExtSet<T>): ExtSetBuilder<T>;
        public reset(): ExtSetBuilder<T>;
    }
}
declare module Haeckel {
    interface BitSet extends Haeckel.Set {
        bits: number;
    }
    function isBitSet(o: BitSet): boolean;
}
declare module Haeckel {
    interface IntSet<T> extends Haeckel.Set {
        criterion: (element: T) => boolean;
    }
    function isIntSet(o: IntSet<any>): boolean;
}
declare module Haeckel {
    interface Range extends Haeckel.Set {
        max: number;
        mean: number;
        min: number;
        size: number;
    }
    function isRange(o: Range): boolean;
}
declare module Haeckel {
    interface Point extends Haeckel.Model {
        x: number;
        y: number;
    }
    function isPoint(o: Point): boolean;
}
declare module Haeckel {
    interface Ray extends Haeckel.Set {
        angle: number;
        origin: Haeckel.Point;
    }
    function isRay(o: any): boolean;
}
declare module Haeckel {
    interface Rectangle extends Haeckel.Point, Haeckel.Set {
        area: number;
        bottom: number;
        centerX: number;
        centerY: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
        x2: number;
        y2: number;
    }
    function isRectangle(o: Rectangle): boolean;
}
declare module Haeckel {
    interface Entity extends Haeckel.Model {
        uid: string;
    }
    function isEntity(o: Entity): boolean;
}
declare module Haeckel {
    interface Taxic extends Haeckel.Set {
        entities: Haeckel.ExtSet<Haeckel.Entity>;
        isUnit: boolean;
        units: Haeckel.ExtSet<Taxic>;
    }
    function isTaxic(o: Taxic): boolean;
}
declare module Haeckel {
    interface TypeSet<T> extends Haeckel.Set {
        contains: (element: T) => boolean;
    }
    function isTypeSet(o: TypeSet<any>): boolean;
}
declare module Haeckel {
    interface EmptySet extends Haeckel.ExtSet<any>, Haeckel.BitSet, Haeckel.IntSet<any>, Haeckel.Range, Haeckel.Ray, Haeckel.Rectangle, Haeckel.Taxic, Haeckel.TypeSet<any> {
    }
}
declare module Haeckel {
    var EMPTY_SET: EmptySet;
}
declare module Haeckel.arr {
    function each<T>(list: T[], f: (element: T) => any, thisObject?: any): void;
}
declare module Haeckel {
    interface Character<S extends Haeckel.Set> extends Haeckel.Entity {
        combine: (statesList: S[]) => S;
        domain: S;
        distance?: (statesA: S, statesB: S) => Haeckel.Range;
        inferrer?: Haeckel.Inferrer<S>;
        readStates: (data: any) => S;
        writeStates: (states: S) => any;
    }
    function isCharacter(o: any): boolean;
}
declare module Haeckel.chr {
    function hashMapStates<S extends Haeckel.Set>(map: {
        [hash: string]: S;
    }, taxon: Haeckel.Taxic, character: Haeckel.Character<S>): S;
}
declare module Haeckel {
    interface CharacterMatrix<S extends Haeckel.Set> {
        characters: Haeckel.ExtSet<Haeckel.Character<S>>;
        characterList: Haeckel.Character<S>[];
        hashMap: {
            [unitCharacterCompositeHash: string]: S;
        };
        taxon: Haeckel.Taxic;
    }
    function isCharacterMatrix(o: any): boolean;
}
declare module Haeckel.chr {
    function states<S extends Haeckel.Set>(matrix: Haeckel.CharacterMatrix<S>, taxon: Haeckel.Taxic, character: Haeckel.Character<S>): S;
}
declare module Haeckel.ext {
    function each<T>(set: Haeckel.ExtSet<T>, f: (element: T) => any, thisObject?: any): void;
}
declare module Haeckel.chr {
    function definedUnits<S extends Haeckel.Set>(matrix: Haeckel.CharacterMatrix<S>, character: Haeckel.Character<S>): Haeckel.ExtSet<Haeckel.Taxic>;
}
declare module Haeckel {
    var RANGE_0: Range;
}
declare module Haeckel.dst {
    function hashMapDistance(hashMap: {
        [hash: string]: {
            [hash: string]: Haeckel.Range;
        };
    }, a: any, b: any): Haeckel.Range;
}
declare module Haeckel {
    interface DistanceMatrix<T> {
        hashMap: {
            [hash: string]: {
                [hash: string]: Haeckel.Range;
            };
        };
        members: Haeckel.ExtSet<T>;
    }
    function isDistanceMatrix(o: DistanceMatrix<any>): boolean;
}
declare module Haeckel.dst {
    function get<T>(matrix: Haeckel.DistanceMatrix<T>, a: T, b: T): Haeckel.Range;
}
declare module Haeckel.ext {
    function contains<T>(set: Haeckel.ExtSet<T>, element: T): boolean;
}
declare module Haeckel {
    function equal(a: any, b: any): boolean;
}
declare module Haeckel.ext {
    function intersect<T>(a: Haeckel.ExtSet<T>, b: Haeckel.ExtSet<T>): Haeckel.ExtSet<T>;
}
declare module Haeckel.ext {
    function create<T>(elements: T[]): Haeckel.ExtSet<T>;
}
declare module Haeckel.tax {
    function createUnitForEntity(entity: Haeckel.Entity): Haeckel.Taxic;
}
declare module Haeckel.tax {
    function create(entities: Haeckel.ExtSet<Haeckel.Entity>): Haeckel.Taxic;
}
declare module Haeckel.tax {
    function union(taxa: Haeckel.Taxic[]): Haeckel.Taxic;
}
declare module Haeckel {
    interface WeightedStates<S extends Haeckel.Set> {
        states: S;
        weight: number;
    }
    function isWeightedStates(o: any): boolean;
}
declare module Haeckel {
    class SolverCache {
        private _results;
        public get<T>(key: string): T;
        static getKey(functionName: String, args: any[]): string;
        public set<T>(key: string, value: T): T;
    }
}
declare module Haeckel {
    interface Arc<T> extends T[] {
    }
    function isArc(o: Arc<any>): boolean;
}
declare module Haeckel {
    interface Digraph<V> extends Haeckel.ExtSet<any>[] {
        arcs: Haeckel.ExtSet<Haeckel.Arc<V>>;
        vertices: Haeckel.ExtSet<V>;
    }
    function isDigraph(o: Digraph<any>): boolean;
}
declare module Haeckel {
    class DigraphBuilder<T> implements Haeckel.Builder<Haeckel.Digraph<T>> {
        private _arcs;
        private _vertices;
        public addArc(head: T, tail: T): DigraphBuilder<T>;
        public addArcs(arcs: Haeckel.ExtSet<Haeckel.Arc<T>>): DigraphBuilder<T>;
        public addGraph(graph: Haeckel.Digraph<T>): DigraphBuilder<T>;
        public addVertex(vertex: T): DigraphBuilder<T>;
        public addVertices(vertices: Haeckel.ExtSet<T>): DigraphBuilder<T>;
        public build(): Haeckel.Digraph<T>;
        public buildArcs(): Haeckel.ExtSet<Haeckel.Arc<T>>;
        public buildSubgraph(vertices: Haeckel.ExtSet<T>): Haeckel.Digraph<T>;
        public buildVertices(): Haeckel.ExtSet<T>;
        public containsArc(arc: Haeckel.Arc<T>): boolean;
        public containsVertex(vertex: T): boolean;
        public removeArc(head: T, tail: T): DigraphBuilder<T>;
        public removeVertex(vertex: T): DigraphBuilder<T>;
        public replaceVertex(oldVertex: T, newVertex: T): DigraphBuilder<T>;
        public reset(): DigraphBuilder<T>;
    }
}
declare module Haeckel {
    var EMPTY_DIGRAPH: Digraph<any>;
}
declare module Haeckel.ext {
    function list<T>(set: Haeckel.ExtSet<T>): T[];
}
declare module Haeckel {
    class DAGBuilder<T> implements Haeckel.Builder<Haeckel.Digraph<T>> {
        private _builder;
        private _closure;
        private _reduction;
        public addArc(head: T, tail: T): DAGBuilder<T>;
        public addArcs(arcs: Haeckel.ExtSet<Haeckel.Arc<T>>): DAGBuilder<T>;
        public addGraph(graph: Haeckel.Digraph<T>): DAGBuilder<T>;
        public addVertex(vertex: T): DAGBuilder<T>;
        public addVertices(vertices: Haeckel.ExtSet<T>): DAGBuilder<T>;
        public adjacencyMatrix(vertices?: T[]): boolean[][];
        public build(): Haeckel.Digraph<T>;
        public buildArcs(): Haeckel.ExtSet<Haeckel.Arc<T>>;
        public buildClosure(): Haeckel.Digraph<T>;
        public buildReduction(): Haeckel.Digraph<T>;
        public buildSubgraph(vertices: Haeckel.ExtSet<T>): Haeckel.Digraph<T>;
        public buildVertices(): Haeckel.ExtSet<T>;
        public containsArc(arc: Haeckel.Arc<T>): boolean;
        public containsVertex(vertex: T): boolean;
        public removeArc(head: T, tail: T): DAGBuilder<T>;
        public removeVertex(vertex: T): DAGBuilder<T>;
        public replaceVertex(oldVertex: T, newVertex: T): DAGBuilder<T>;
        public reset(): DAGBuilder<T>;
    }
}
declare module Haeckel {
    var PRECISION: number;
}
declare module Haeckel {
    var RANGE_0_TO_1: Range;
}
declare module Haeckel {
    var RANGE_1: Range;
}
declare module Haeckel {
    var RANGE_INF: Range;
}
declare module Haeckel {
    var RANGE_NEG_INF: Range;
}
declare module Haeckel {
    var RANGE_POS_INF: Range;
}
declare module Haeckel.rng {
    function create(min: number, max?: number): Haeckel.Range;
}
declare module Haeckel {
    class DistanceMatrixBuilder<T> implements Haeckel.Builder<Haeckel.DistanceMatrix<T>> {
        private _hashMap;
        private _members;
        public addDistance(a: T, b: T, d: number): DistanceMatrixBuilder<T>;
        public addRange(a: T, b: T, range: Haeckel.Range): DistanceMatrixBuilder<T>;
        public build(): Haeckel.DistanceMatrix<T>;
        public get(a: T, b: T): Haeckel.Range;
        public reset(): DistanceMatrixBuilder<T>;
    }
}
declare module Haeckel.ext {
    function setDiff<T>(minuend: Haeckel.ExtSet<T>, subtrahend: Haeckel.ExtSet<T>): Haeckel.ExtSet<T>;
}
declare module Haeckel.ext {
    function union<T>(sets: Haeckel.ExtSet<T>[]): Haeckel.ExtSet<T>;
}
declare module Haeckel {
    class DAGSolver<T> {
        private _builder;
        private _cache;
        private _graph;
        public arcs : Haeckel.ExtSet<T[]>;
        public graph : Haeckel.Digraph<T>;
        public sinks : Haeckel.ExtSet<T>;
        public sources : Haeckel.ExtSet<T>;
        public vertices : Haeckel.ExtSet<T>;
        constructor(graph: Haeckel.Digraph<T>);
        public distance(x: T, y: T, traversedBuilder?: Haeckel.ExtSetBuilder<T>): number;
        public imPrcs(vertex: T): Haeckel.ExtSet<T>;
        public imSucs(vertex: T): Haeckel.ExtSet<T>;
        public prcs(vertex: T): Haeckel.ExtSet<T>;
        public subgraph(vertices: Haeckel.ExtSet<T>): Haeckel.Digraph<T>;
        public subgraphSolver(vertices: Haeckel.ExtSet<T>): DAGSolver<T>;
        public sucs(vertex: T): Haeckel.ExtSet<T>;
        public toDistanceMatrix(): Haeckel.DistanceMatrix<T>;
    }
}
declare module Haeckel {
    class CharacterMatrixBuilder<S extends Haeckel.Set> implements Haeckel.Builder<Haeckel.CharacterMatrix<S>> {
        private _characterList;
        private _characterMatrix;
        private _characters;
        private _distanceMatrix;
        private _hashMap;
        private _solver;
        private _taxon;
        private _infer(timesRun);
        private _inferCharacter(character);
        private _inferUnit(character, definedUnits, unit);
        private _runInference();
        private _weightedStates(character, units, focus);
        public characterList : Haeckel.Character<S>[];
        public taxon : Haeckel.Taxic;
        public add(character: Haeckel.Character<S>): CharacterMatrixBuilder<S>;
        public addListed(character: Haeckel.Character<S>): CharacterMatrixBuilder<S>;
        public addMatrix(matrix: Haeckel.CharacterMatrix<S>): CharacterMatrixBuilder<S>;
        public build(): Haeckel.CharacterMatrix<S>;
        public inferStates(solver: Haeckel.DAGSolver<Haeckel.Taxic>, distanceMatrix?: Haeckel.DistanceMatrix<Haeckel.Taxic>): CharacterMatrixBuilder<S>;
        public removeCharacter(character: Haeckel.Character<S>): CharacterMatrixBuilder<S>;
        public removeStates(taxon: Haeckel.Taxic, character: Haeckel.Character<S>): CharacterMatrixBuilder<S>;
        public removeTaxon(taxon: Haeckel.Taxic): CharacterMatrixBuilder<S>;
        public reset(): CharacterMatrixBuilder<S>;
        public states(taxon: Haeckel.Taxic, character: Haeckel.Character<S>): S;
        public states(taxon: Haeckel.Taxic, character: Haeckel.Character<S>, states: S): CharacterMatrixBuilder<S>;
    }
}
declare module Haeckel {
    interface Color {
        b: number;
        error: boolean;
        g: number;
        hex: string;
        r: number;
    }
}
declare module Haeckel {
    interface GradientEntry {
        color: Haeckel.Color;
        ratio: number;
    }
}
declare module Haeckel {
    var BLACK: Color;
}
declare module Haeckel {
    var RAD_TO_DEG: number;
}
declare module Haeckel {
    var TAU: number;
}
declare module Haeckel.trg {
    function normalize(radians: number): number;
}
declare module Haeckel {
    class LinearGradientBuilder implements Haeckel.Builder<string> {
        public angle: number;
        public end: Haeckel.Color;
        public start: Haeckel.Color;
        private _tweens;
        public add(entry: Haeckel.GradientEntry): LinearGradientBuilder;
        public build(): string;
        public reset(): LinearGradientBuilder;
        public resetEntries(): LinearGradientBuilder;
    }
}
declare module Haeckel {
    interface Nomenclature {
        nameMap: {
            [name: string]: Haeckel.Taxic;
        };
        names: Haeckel.ExtSet<string>;
        taxa: Haeckel.ExtSet<Haeckel.Taxic>;
    }
    function isNomenclature(o: any): boolean;
}
declare module Haeckel {
    function seedRandom(...args: any[]): () => number;
}
declare module Haeckel {
    function guid4(): string;
}
declare module Haeckel.tax {
    function createUnit(): Haeckel.Taxic;
}
declare module Haeckel {
    class NomenclatureBuilder implements Haeckel.Builder<Haeckel.Nomenclature> {
        private _nameSets;
        private _nameToNameSet;
        public addName(name: string): NomenclatureBuilder;
        public build(): Haeckel.Nomenclature;
        public hyponymize(hyperonym: string, hyponym: string): NomenclatureBuilder;
        public reset(): NomenclatureBuilder;
        public synonymize(nameA: string, nameB: string): NomenclatureBuilder;
    }
}
declare module Haeckel {
    class PathBuilder implements Haeckel.Builder<string> {
        private points;
        public add(point: Haeckel.Point): PathBuilder;
        public build(): string;
        public reset(): PathBuilder;
    }
}
declare module Haeckel {
    class RangeBuilder implements Haeckel.Builder<Haeckel.Range> {
        private _max;
        private _min;
        public add(value: number): RangeBuilder;
        public addRange(range: Haeckel.Range): RangeBuilder;
        public build(): Haeckel.Range;
        public reset(): RangeBuilder;
    }
}
declare module Haeckel.ext {
    function singleMember<T>(set: Haeckel.ExtSet<T>): T;
}
declare module Haeckel {
    class TaxonBuilder implements Haeckel.Builder<Haeckel.Taxic> {
        private _entitiesBuilder;
        private _unitsBuilder;
        public add(taxon: Haeckel.Taxic): TaxonBuilder;
        public addSet(taxa: Haeckel.ExtSet<Haeckel.Taxic>): TaxonBuilder;
        public build(): Haeckel.Taxic;
        public remove(taxon: Haeckel.Taxic): TaxonBuilder;
        public removeSet(taxa: Haeckel.ExtSet<Haeckel.Taxic>): TaxonBuilder;
        public reset(): TaxonBuilder;
    }
}
declare module Haeckel {
    var BIT_MEMBER_MAX: number;
}
declare module Haeckel.chr {
    function initiate<S extends Haeckel.Set>(domain: S): Haeckel.Character<S>;
}
declare module Haeckel.chr {
    function normalizeWeights<S extends Haeckel.Set>(statesList: Haeckel.WeightedStates<S>[]): Haeckel.WeightedStates<S>[];
}
declare module Haeckel.rng {
    function combine(ranges: Haeckel.Range[]): Haeckel.Range;
}
declare module Haeckel.rng {
    function overlap(a: Haeckel.Range, b: Haeckel.Range): boolean;
}
declare module Haeckel.rng {
    function distance(a: Haeckel.Range, b: Haeckel.Range): Haeckel.Range;
}
declare module Haeckel.rng {
    function multiply(r: Haeckel.Range, factor: number): Haeckel.Range;
}
declare module Haeckel.rng {
    function read(data: number): Haeckel.Range;
    function read(data: number[]): Haeckel.Range;
}
declare module Haeckel.rng {
    function write(r: Haeckel.Range): any;
}
declare module Haeckel.chr {
    function createRange(domain: Haeckel.Range, inferrable?: boolean, distance?: boolean): Haeckel.Character<Haeckel.Range>;
}
declare module Haeckel {
    var COUNT_CHARACTER: Character<Range>;
}
declare module Haeckel {
    var ORIGIN: Point;
}
declare module Haeckel.pt {
    function create(x: number, y: number): Haeckel.Point;
}
declare module Haeckel {
    interface GeoCoords extends Haeckel.Model {
        lat: number;
        lon: number;
    }
    function isGeoCoords(o: GeoCoords): boolean;
}
declare module Haeckel {
    function DEFAULT_PROJECTOR(coords: GeoCoords): Point;
}
declare module Haeckel {
    var DEG_TO_RAD: number;
}
declare module Haeckel {
    var EMPTY_CHARACTER_MATRIX: CharacterMatrix<Set>;
}
declare module Haeckel {
    var EMPTY_DAG_SOLVER: DAGSolver<any>;
}
declare module Haeckel {
    var EMPTY_DISTANCE_MATRIX: DistanceMatrix<any>;
}
declare module Haeckel {
    var EMPTY_MAP: (value: any) => any;
}
declare module Haeckel {
    var EMPTY_NOMENCLATURE: Nomenclature;
}
declare module Haeckel.ext {
    function includes<T>(a: Haeckel.ExtSet<T>, b: Haeckel.ExtSet<T>): boolean;
}
declare module Haeckel.tax {
    function includes(a: Haeckel.Taxic, b: Haeckel.Taxic): boolean;
}
declare module Haeckel.tax {
    function intersect(a: Haeckel.Taxic, b: Haeckel.Taxic): Haeckel.Taxic;
}
declare module Haeckel.tax {
    function setDiff(minuend: Haeckel.Taxic, subtrahend: Haeckel.Taxic): Haeckel.Taxic;
}
declare module Haeckel {
    class PhyloSolver {
        private _cache;
        private _dagSolver;
        private _graph;
        private _taxonBuilder;
        public dagSolver : Haeckel.DAGSolver<Haeckel.Taxic>;
        public graph : Haeckel.Digraph<Haeckel.Taxic>;
        public universal : Haeckel.Taxic;
        constructor(graph: Haeckel.Digraph<Haeckel.Taxic>);
        constructor(builder: Haeckel.DAGBuilder<Haeckel.Taxic>);
        constructor(solver: Haeckel.DAGSolver<Haeckel.Taxic>);
        public branch(internal: Haeckel.Taxic, external: Haeckel.Taxic): Haeckel.Taxic;
        public clade(taxon: Haeckel.Taxic): Haeckel.Taxic;
        public cladogen(taxon: Haeckel.Taxic): Haeckel.Taxic;
        public crown(specifiers: Haeckel.Taxic, extant: Haeckel.Taxic): Haeckel.Taxic;
        public distance(x: Haeckel.Taxic, y: Haeckel.Taxic): number;
        public isCladogen(taxon: Haeckel.Taxic): boolean;
        public max(taxon: Haeckel.Taxic): Haeckel.Taxic;
        public min(taxon: Haeckel.Taxic): Haeckel.Taxic;
        public prcIntersect(taxon: Haeckel.Taxic): Haeckel.Taxic;
        public prcUnion(taxon: Haeckel.Taxic): Haeckel.Taxic;
        public subgraph(taxon: Haeckel.Taxic): Haeckel.Digraph<Haeckel.Taxic>;
        public subgraphSolver(taxon: Haeckel.Taxic): PhyloSolver;
        public sucIntersect(taxon: Haeckel.Taxic): Haeckel.Taxic;
        public sucUnion(taxon: Haeckel.Taxic): Haeckel.Taxic;
        public synPrc(apomorphic: Haeckel.Taxic, representative: Haeckel.Taxic): Haeckel.Taxic;
        public total(specifiers: Haeckel.Taxic, extant: Haeckel.Taxic): Haeckel.Taxic;
    }
}
declare module Haeckel {
    var EMPTY_PHYLO_SOLVER: PhyloSolver;
}
declare module Haeckel.ext {
    function domain<T>(hash: string): Haeckel.ExtSet<T>;
}
declare module Haeckel.chr {
    function createDomain<T>(hash: string, readStates?: (data: any) => Haeckel.ExtSet<T>, writeStates?: (states: Haeckel.ExtSet<T>) => any): Haeckel.Character<Haeckel.ExtSet<T>>;
}
declare module Haeckel.geo {
    function createCoords(lat: number, lon: number): Haeckel.GeoCoords;
}
declare module Haeckel.geo {
    function readCoords(data: number[]): Haeckel.GeoCoords;
}
declare module Haeckel.geo {
    function readRegion(data: number[][]): Haeckel.GeoCoords[];
}
declare module Haeckel {
    interface GeoData {
        [regionName: string]: number[][];
    }
}
declare module Haeckel.geo {
    function readRegions(data: Haeckel.GeoData): Haeckel.ExtSet<Haeckel.GeoCoords[]>;
    function readRegions(data: number[][][]): Haeckel.ExtSet<Haeckel.GeoCoords[]>;
}
declare module Haeckel {
    var GEO_CHARACTER: Character<ExtSet<GeoCoords[]>>;
}
declare module Haeckel {
    interface OccurrenceData {
        count?: any;
        geo?: Haeckel.GeoData;
        time?: any;
    }
}
declare module Haeckel {
    interface Occurrence extends Haeckel.Model {
        count: Haeckel.Range;
        geo: Haeckel.ExtSet<Haeckel.GeoCoords[]>;
        time: Haeckel.Range;
    }
    function isOccurrence(o: any): boolean;
}
declare module Haeckel.occ {
    function readOccurrences(data: Haeckel.OccurrenceData[]): Haeckel.ExtSet<Haeckel.Occurrence>;
    function readOccurrences(data: {
        [key: string]: Haeckel.OccurrenceData;
    }): Haeckel.ExtSet<Haeckel.Occurrence>;
}
declare module Haeckel {
    var OCCURRENCE_CHARACTER: Character<ExtSet<Occurrence>>;
}
declare module Haeckel {
    var TIME_CHARACTER: Character<Range>;
}
declare module Haeckel {
    interface Vector extends Haeckel.Model {
        angle: number;
        distance: number;
    }
    function isVector(o: any): boolean;
}
declare module Haeckel {
    var VECTOR_0: Vector;
}
declare module Haeckel.arr {
    function contains<T>(list: T[], element: T): boolean;
}
declare module Haeckel.arr {
    function forAll<T>(list: T[], f: (element: T) => boolean, thisObject?: any): boolean;
}
declare module Haeckel.arr {
    function forSome<T>(list: T[], f: (element: T) => boolean, thisObject?: any): boolean;
}
declare module Haeckel.arr {
    function map<A, B>(list: A[], f: (element: A) => B, thisObject?: any): B[];
}
declare module Haeckel.arr {
    function where<T>(list: T[], f: (element: T) => boolean, thisObject?: any): T[];
}
declare module Haeckel.bit {
    function contains(s: Haeckel.BitSet, n: number): boolean;
}
declare module Haeckel.bit {
    function createFromBits(bits: number): Haeckel.BitSet;
}
declare module Haeckel.bit {
    function create(members: number[]): Haeckel.BitSet;
}
declare module Haeckel.bit {
    function intersect(a: Haeckel.BitSet, b: Haeckel.BitSet): Haeckel.BitSet;
}
declare module Haeckel.bit {
    function size(s: Haeckel.BitSet): number;
}
declare module Haeckel.bit {
    function distance(a: Haeckel.BitSet, b: Haeckel.BitSet): Haeckel.Range;
}
declare module Haeckel.bit {
    function each(s: Haeckel.BitSet, f: (value: number) => any, thisObject?: any): void;
}
declare module Haeckel.bit {
    function forAll(s: Haeckel.BitSet, f: (value: number) => boolean, thisObject?: any): boolean;
}
declare module Haeckel.bit {
    function forSome(s: Haeckel.BitSet, f: (value: number) => boolean, thisObject?: any): boolean;
}
declare module Haeckel.bit {
    function includes(superset: Haeckel.BitSet, subset: Haeckel.BitSet): boolean;
}
declare module Haeckel.bit {
    function prIncludes(superset: Haeckel.BitSet, subset: Haeckel.BitSet): boolean;
}
declare module Haeckel.bit {
    function read(data: number): Haeckel.BitSet;
    function read(data: number[]): Haeckel.BitSet;
}
declare module Haeckel.bit {
    function setDiff(minuend: Haeckel.BitSet, subtrahend: Haeckel.BitSet): Haeckel.BitSet;
}
declare module Haeckel.bit {
    function union(sets: Haeckel.BitSet[]): Haeckel.BitSet;
}
declare module Haeckel.bit {
    function write(set: Haeckel.BitSet): any;
}
declare module Haeckel {
    function combiner<S extends Set>(union: (sets: S[]) => S): (sets: S[]) => S;
}
declare module Haeckel.chr {
    function createBit(domain: Haeckel.BitSet, inferrable?: boolean, distance?: boolean): Haeckel.Character<Haeckel.BitSet>;
}
declare module Haeckel.ext {
    function distance<T>(a: Haeckel.ExtSet<T>, b: Haeckel.ExtSet<T>): Haeckel.Range;
}
declare module Haeckel.ext {
    function read<T>(data: any): Haeckel.ExtSet<T>;
}
declare module Haeckel.chr {
    function createExt<T>(domain: Haeckel.ExtSet<T>, inferrable?: boolean, distance?: boolean): Haeckel.Character<Haeckel.ExtSet<T>>;
}
declare module Haeckel.ist {
    function create<T>(criterion: (element: T) => boolean): Haeckel.IntSet<T>;
}
declare module Haeckel.chr {
    function createInt<T>(criterion: (element: T) => boolean, combine?: (sets: Haeckel.IntSet<T>[]) => Haeckel.IntSet<T>, readStates?: (data: any) => Haeckel.IntSet<T>, writeStates?: (states: Haeckel.IntSet<T>) => any): Haeckel.Character<Haeckel.IntSet<T>>;
}
declare module Haeckel.rng {
    function sum(ranges: Haeckel.Range[]): Haeckel.Range;
}
declare module Haeckel.chr {
    function toDistanceMatrix(matrix: Haeckel.CharacterMatrix<Haeckel.Set>, anchors?: Haeckel.Taxic): Haeckel.DistanceMatrix<Haeckel.Taxic>;
}
declare module Haeckel.clr {
    function create(r: number, g: number, b: number): Haeckel.Color;
}
declare module Haeckel {
    interface Dating extends Haeckel.Model {
        taxa: Haeckel.ExtSet<Haeckel.Taxic>;
        time: Haeckel.Range;
    }
    function isDating(o: Dating): boolean;
}
declare module Haeckel.dat {
    function toCharacterMatrixBuilder(datings: Haeckel.ExtSet<Haeckel.Dating>, phyloSolver: Haeckel.PhyloSolver): Haeckel.CharacterMatrixBuilder<Haeckel.Range>;
}
declare module Haeckel {
    interface Point3D extends Haeckel.Point {
        z: number;
    }
    function isPoint3D(o: Point3D): boolean;
}
declare module Haeckel.geo {
    function toPoint3D(coords: Haeckel.GeoCoords, radius?: number): Haeckel.Point3D;
}
declare module Haeckel.geo {
    function center(regions: Haeckel.ExtSet<Haeckel.GeoCoords[]>): Haeckel.GeoCoords;
    function center(region: Haeckel.GeoCoords[]): Haeckel.GeoCoords;
}
declare module Haeckel.geo {
    function project(regions: Haeckel.ExtSet<Haeckel.GeoCoords[]>, projector: (coords: Haeckel.GeoCoords) => Haeckel.Point): Haeckel.Point[][];
}
declare module Haeckel.ist {
    function union<T>(sets: Haeckel.IntSet<T>[]): Haeckel.IntSet<T>;
}
declare module Haeckel.occ {
    function create(count?: Haeckel.Range, geo?: Haeckel.ExtSet<Haeckel.GeoCoords[]>, time?: Haeckel.Range): Haeckel.Occurrence;
}
declare module Haeckel.occ {
    function read(data: Haeckel.OccurrenceData): Haeckel.Occurrence;
}
declare module Haeckel.pt {
    function create3D(x: number, y: number, z: number): Haeckel.Point3D;
}
declare module Haeckel {
    interface Axis {
        labelFunction?: (value: number) => string;
        range: Haeckel.Range;
        step: number;
    }
    function isAxis(o: Axis): boolean;
}
declare module Haeckel {
    interface Stratum extends Haeckel.Model {
        type: string;
        name: string;
        start: Haeckel.Range;
        end: Haeckel.Range;
    }
    function isStratum(o: any): boolean;
}
declare module Haeckel {
    interface DataSourceMetadata {
        authors?: string[];
        day?: number;
        issue?: any;
        journal?: string;
        month?: number;
        pages?: number[];
        title?: string;
        uri?: string;
        volume?: any;
        year?: number;
    }
    interface DataSource {
        characterMatrices: {
            [name: string]: Haeckel.CharacterMatrix<Haeckel.Set>;
        };
        datings: {
            [name: string]: Haeckel.ExtSet<Haeckel.Dating>;
        };
        distanceMatrices: {
            [name: string]: Haeckel.DistanceMatrix<Haeckel.Taxic>;
        };
        metadata: DataSourceMetadata;
        nomenclature: Haeckel.Nomenclature;
        occurrences: Haeckel.CharacterMatrix<Haeckel.Set>;
        phylogenies: {
            [name: string]: Haeckel.Digraph<Haeckel.Taxic>;
        };
        strata: Haeckel.ExtSet<Haeckel.Stratum>;
    }
}
declare module Haeckel {
    interface DataSources {
        [filename: string]: Haeckel.DataSource;
    }
}
declare module Haeckel {
    interface DistanceAxis {
        distance: Haeckel.Range;
        endpoints: Haeckel.ExtSet<number>;
    }
}
declare module Haeckel {
    interface DistanceItem<T> {
        distance: Haeckel.Range;
        item: T;
    }
}
declare module Haeckel {
    interface Figure {
        dataSources: string[];
        height: string;
        width: string;
        render(dataSources: Haeckel.DataSources): SVGSVGElement;
    }
}
declare module Haeckel {
    interface Inferrer<S extends Haeckel.Set> {
        average: (statesList: Haeckel.WeightedStates<S>[]) => S;
    }
    function isInferrer(o: any): boolean;
}
declare module Haeckel {
    interface Renderer {
        render(svg: SVGSVGElement): SVGElement;
    }
}