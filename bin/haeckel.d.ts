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
    interface Set extends Model {
        empty: boolean;
    }
    function isSet(o: Set): boolean;
}
declare module Haeckel {
    interface ExtSet<T> extends Set {
        hashMap: {
            [hash: string]: T;
        };
        size: number;
    }
    function isExtSet(o: ExtSet<any>): boolean;
}
declare module Haeckel {
    class ExtSetBuilder<T> implements Builder<ExtSet<T>> {
        private _hashMap;
        public add(...elements: T[]): ExtSetBuilder<T>;
        public addList(elements: T[]): ExtSetBuilder<T>;
        public addSet(elements: ExtSet<T>): ExtSetBuilder<T>;
        public build(): ExtSet<T>;
        public contains(element: T): boolean;
        public remove(...elements: T[]): ExtSetBuilder<T>;
        public removeList(elements: T[]): ExtSetBuilder<T>;
        public removeSet(elements: ExtSet<T>): ExtSetBuilder<T>;
        public reset(): ExtSetBuilder<T>;
    }
}
declare module Haeckel {
    interface BitSet extends Set {
        bits: number;
    }
    function isBitSet(o: BitSet): boolean;
}
declare module Haeckel {
    interface IntSet<T> extends Set {
        criterion: (element: T) => boolean;
    }
    function isIntSet(o: IntSet<any>): boolean;
}
declare module Haeckel {
    interface Range extends Set {
        max: number;
        mean: number;
        min: number;
        size: number;
    }
    function isRange(o: Range): boolean;
}
declare module Haeckel {
    interface Point extends Model {
        x: number;
        y: number;
    }
    function isPoint(o: Point): boolean;
}
declare module Haeckel {
    interface Ray extends Set {
        angle: number;
        origin: Point;
    }
    function isRay(o: any): boolean;
}
declare module Haeckel {
    interface Rectangle extends Point, Set {
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
    interface Entity extends Model {
        uid: string;
    }
    function isEntity(o: Entity): boolean;
}
declare module Haeckel {
    interface Taxic extends Set {
        entities: ExtSet<Entity>;
        isUnit: boolean;
        units: ExtSet<Taxic>;
    }
    function isTaxic(o: Taxic): boolean;
}
declare module Haeckel {
    interface TypeSet<T> extends Set {
        contains: (element: T) => boolean;
    }
    function isTypeSet(o: TypeSet<any>): boolean;
}
declare module Haeckel {
    interface EmptySet extends ExtSet<any>, BitSet, IntSet<any>, Range, Ray, Rectangle, Taxic, TypeSet<any> {
    }
}
declare module Haeckel {
    var EMPTY_SET: EmptySet;
}
declare module Haeckel.arr {
    function each<T>(list: T[], f: (element: T) => any, thisObject?: any): void;
}
declare module Haeckel {
    interface WeightedStates<S extends Set> {
        states: S;
        weight: number;
    }
    function isWeightedStates(o: any): boolean;
}
declare module Haeckel {
    interface Inferrer<S extends Set> {
        average: (statesList: WeightedStates<S>[]) => S;
    }
    function isInferrer(o: any): boolean;
}
declare module Haeckel {
    interface Character<S extends Set> extends Entity {
        combine: (statesList: S[]) => S;
        domain: S;
        distance?: (statesA: S, statesB: S) => Range;
        inferrer?: Inferrer<S>;
        readStates: (data: any) => S;
        writeStates: (states: S) => any;
    }
    function isCharacter(o: any): boolean;
}
declare module Haeckel.chr {
    function hashMapStates<S extends Set>(map: {
        [hash: string]: S;
    }, taxon: Taxic, character: Character<S>): S;
}
declare module Haeckel {
    interface CharacterMatrix<S extends Set> {
        characters: ExtSet<Character<S>>;
        characterList: Character<S>[];
        hashMap: {
            [unitCharacterCompositeHash: string]: S;
        };
        taxon: Taxic;
    }
    function isCharacterMatrix(o: any): boolean;
}
declare module Haeckel.chr {
    function states<S extends Set>(matrix: CharacterMatrix<S>, taxon: Taxic, character: Character<S>): S;
}
declare module Haeckel.ext {
    function each<T>(set: ExtSet<T>, f: (element: T) => any, thisObject?: any): void;
}
declare module Haeckel.chr {
    function definedUnits<S extends Set>(matrix: CharacterMatrix<S>, character: Character<S>): ExtSet<Taxic>;
}
declare module Haeckel {
    var RANGE_0: Range;
}
declare module Haeckel.dst {
    function hashMapDistance(hashMap: {
        [hash: string]: {
            [hash: string]: Range;
        };
    }, a: any, b: any): Range;
}
declare module Haeckel {
    interface DistanceMatrix<T> {
        hashMap: {
            [hash: string]: {
                [hash: string]: Range;
            };
        };
        members: ExtSet<T>;
    }
    function isDistanceMatrix(o: DistanceMatrix<any>): boolean;
}
declare module Haeckel.dst {
    function get<T>(matrix: DistanceMatrix<T>, a: T, b: T): Range;
}
declare module Haeckel.ext {
    function contains<T>(set: ExtSet<T>, element: T): boolean;
}
declare module Haeckel {
    function equal(a: any, b: any): boolean;
}
declare module Haeckel.ext {
    function intersect<T>(a: ExtSet<T>, b: ExtSet<T>): ExtSet<T>;
}
declare module Haeckel.ext {
    function setDiff<T>(minuend: ExtSet<T>, subtrahend: ExtSet<T>): ExtSet<T>;
}
declare module Haeckel.ext {
    function create<T>(elements: T[]): ExtSet<T>;
}
declare module Haeckel.tax {
    function createUnitForEntity(entity: Entity): Taxic;
}
declare module Haeckel.tax {
    function create(entities: ExtSet<Entity>): Taxic;
}
declare module Haeckel.tax {
    function setDiff(minuend: Taxic, subtrahend: Taxic): Taxic;
}
declare module Haeckel.tax {
    function union(taxa: Taxic[]): Taxic;
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
    interface Arc<T> extends Array<T> {
    }
    function isArc(o: Arc<any>): boolean;
}
declare module Haeckel {
    interface Digraph<V> extends Array<ExtSet<any>> {
        arcs: ExtSet<Arc<V>>;
        vertices: ExtSet<V>;
    }
    function isDigraph(o: Digraph<any>): boolean;
}
declare module Haeckel {
    class DigraphBuilder<T> implements Builder<Digraph<T>> {
        private _arcs;
        private _vertices;
        public addArc(head: T, tail: T): DigraphBuilder<T>;
        public addArcs(arcs: ExtSet<Arc<T>>): DigraphBuilder<T>;
        public addGraph(graph: Digraph<T>): DigraphBuilder<T>;
        public addVertex(vertex: T): DigraphBuilder<T>;
        public addVertices(vertices: ExtSet<T>): DigraphBuilder<T>;
        public build(): Digraph<T>;
        public buildArcs(): ExtSet<Arc<T>>;
        public buildSubgraph(vertices: ExtSet<T>): Digraph<T>;
        public buildVertices(): ExtSet<T>;
        public containsArc(arc: Arc<T>): boolean;
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
    function list<T>(set: ExtSet<T>): T[];
}
declare module Haeckel {
    class DAGBuilder<T> implements Builder<Digraph<T>> {
        private _builder;
        private _closure;
        private _reduction;
        public addArc(head: T, tail: T): DAGBuilder<T>;
        public addArcs(arcs: ExtSet<Arc<T>>): DAGBuilder<T>;
        public addGraph(graph: Digraph<T>): DAGBuilder<T>;
        public addVertex(vertex: T): DAGBuilder<T>;
        public addVertices(vertices: ExtSet<T>): DAGBuilder<T>;
        public adjacencyMatrix(vertices?: T[]): boolean[][];
        public build(): Digraph<T>;
        public buildArcs(): ExtSet<Arc<T>>;
        public buildClosure(): Digraph<T>;
        public buildReduction(): Digraph<T>;
        public buildSubgraph(vertices: ExtSet<T>): Digraph<T>;
        public buildVertices(): ExtSet<T>;
        public containsArc(arc: Arc<T>): boolean;
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
    function create(min: number, max?: number): Range;
}
declare module Haeckel {
    class DistanceMatrixBuilder<T> implements Builder<DistanceMatrix<T>> {
        private _hashMap;
        private _members;
        public addDistance(a: T, b: T, d: number): DistanceMatrixBuilder<T>;
        public addRange(a: T, b: T, range: Range): DistanceMatrixBuilder<T>;
        public build(): DistanceMatrix<T>;
        public get(a: T, b: T): Range;
        public reset(): DistanceMatrixBuilder<T>;
    }
}
declare module Haeckel.ext {
    function union<T>(sets: ExtSet<T>[]): ExtSet<T>;
}
declare module Haeckel {
    class DAGSolver<T> {
        private _builder;
        private _cache;
        private _graph;
        public arcs : ExtSet<T[]>;
        public graph : Digraph<T>;
        public sinks : ExtSet<T>;
        public sources : ExtSet<T>;
        public vertices : ExtSet<T>;
        constructor(graph: Digraph<T>);
        public distance(x: T, y: T, traversedBuilder?: ExtSetBuilder<T>): number;
        public imPrcs(vertex: T): ExtSet<T>;
        public imSucs(vertex: T): ExtSet<T>;
        public prcs(vertex: T): ExtSet<T>;
        public subgraph(vertices: ExtSet<T>): Digraph<T>;
        public subgraphSolver(vertices: ExtSet<T>): DAGSolver<T>;
        public sucs(vertex: T): ExtSet<T>;
        public toDistanceMatrix(): DistanceMatrix<T>;
    }
}
declare module Haeckel {
    class CharacterMatrixBuilder<S extends Set> implements Builder<CharacterMatrix<S>> {
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
        public characterList : Character<S>[];
        public taxon : Taxic;
        public add(character: Character<S>): CharacterMatrixBuilder<S>;
        public addListed(character: Character<S>): CharacterMatrixBuilder<S>;
        public addMatrix(matrix: CharacterMatrix<S>): CharacterMatrixBuilder<S>;
        public build(): CharacterMatrix<S>;
        public inferStates(solver: DAGSolver<Taxic>, distanceMatrix?: DistanceMatrix<Taxic>): CharacterMatrixBuilder<S>;
        public removeCharacter(character: Character<S>): CharacterMatrixBuilder<S>;
        public removeStates(taxon: Taxic, character: Character<S>): CharacterMatrixBuilder<S>;
        public removeTaxon(taxon: Taxic): CharacterMatrixBuilder<S>;
        public reset(): CharacterMatrixBuilder<S>;
        public states(taxon: Taxic, character: Character<S>): S;
        public states(taxon: Taxic, character: Character<S>, states: S): CharacterMatrixBuilder<S>;
    }
}
declare module Haeckel {
    class ElementBuilder implements Builder<Element> {
        private document;
        private element;
        private _parent;
        static style(attrs: {
            [style: string]: any;
        }): string;
        constructor(document: Document, element: Element);
        constructor(document: Document, uri: string, localName: string);
        constructor(document: Document, name: string);
        public attr(name: string, value: string): ElementBuilder;
        public attr(uri: string, localName: string, value: string): ElementBuilder;
        public attrs(uri: string, attrs: {
            [name: string]: string;
        }): ElementBuilder;
        public attrs(attrs: {
            [name: string]: string;
        }): ElementBuilder;
        public build(): Element;
        public child(uri: string, localName: string): ElementBuilder;
        public child(name: string): ElementBuilder;
        public detach(): ElementBuilder;
        public parent(): ElementBuilder;
        public reset(): ElementBuilder;
        public text(data: string): ElementBuilder;
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
    var BLACK: Color;
}
declare module Haeckel {
    var SVG_NS: string;
}
declare module Haeckel {
    interface GradientEntry {
        color: Color;
        ratio: number;
        opacity: number;
    }
}
declare module Haeckel {
    class LinearGradientBuilder implements Builder<ElementBuilder> {
        private defsBuilder;
        private id;
        public angle: number;
        public bottom: number;
        public end: Color;
        public endOpacity: number;
        public left: number;
        public right: number;
        public start: Color;
        public startOpacity: number;
        public top: number;
        private _stops;
        constructor(defsBuilder: ElementBuilder, id: string);
        public add(entry: GradientEntry): LinearGradientBuilder;
        public build(): ElementBuilder;
        public reset(): LinearGradientBuilder;
        public resetEntries(): LinearGradientBuilder;
        public resetID(id: string): LinearGradientBuilder;
    }
}
declare module Haeckel {
    interface Nomenclature {
        nameMap: {
            [name: string]: Taxic;
        };
        names: ExtSet<string>;
        taxa: ExtSet<Taxic>;
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
    function createUnit(): Taxic;
}
declare module Haeckel {
    class NomenclatureBuilder implements Builder<Nomenclature> {
        private _nameSets;
        private _nameToNameSet;
        public addName(name: string): NomenclatureBuilder;
        public build(): Nomenclature;
        public hyponymize(hyperonym: string, hyponym: string): NomenclatureBuilder;
        public reset(): NomenclatureBuilder;
        public synonymize(nameA: string, nameB: string): NomenclatureBuilder;
    }
}
declare module Haeckel {
    class PathBuilder implements Builder<string> {
        private points;
        public add(point: Point): PathBuilder;
        public build(): string;
        public reset(): PathBuilder;
    }
}
declare module Haeckel {
    class RangeBuilder implements Builder<Range> {
        private _max;
        private _min;
        public add(value: number): RangeBuilder;
        public addRange(range: Range): RangeBuilder;
        public build(): Range;
        public reset(): RangeBuilder;
    }
}
declare module Haeckel.ext {
    function power<T>(s: ExtSet<T>): ExtSet<ExtSet<T>>;
}
declare module Haeckel.tax {
    function power<T>(taxon: Taxic): ExtSet<Taxic>;
}
declare module Haeckel {
    class TaxicDistanceMatrixBuilder extends DistanceMatrixBuilder<Taxic> {
        public addRange(a: Taxic, b: Taxic, range: Range): TaxicDistanceMatrixBuilder;
    }
}
declare module Haeckel.ext {
    function singleMember<T>(set: ExtSet<T>): T;
}
declare module Haeckel {
    class TaxonBuilder implements Builder<Taxic> {
        private _entitiesBuilder;
        private _unitsBuilder;
        public add(taxon: Taxic): TaxonBuilder;
        public addSet(taxa: ExtSet<Taxic>): TaxonBuilder;
        public build(): Taxic;
        public remove(taxon: Taxic): TaxonBuilder;
        public removeSet(taxa: ExtSet<Taxic>): TaxonBuilder;
        public reset(): TaxonBuilder;
    }
}
declare module Haeckel.rec {
    function create(x: number, y: number, width: number, height: number): Rectangle;
}
declare module Haeckel.rec {
    interface BoundingClientRectElement extends SVGElement {
        getBoundingClientRect(): ClientRect;
    }
    function createFromBoundingClientRect(svg: BoundingClientRectElement): Rectangle;
}
declare module Haeckel {
    interface Axis {
        labelFunction?: (value: number) => string;
        range: Range;
        step: number;
    }
    function isAxis(o: Axis): boolean;
}
declare module Haeckel {
    interface Renderer {
        render(parent: ElementBuilder, defsBuilder: () => ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel {
    class AxisChart implements Renderer {
        public area: Rectangle;
        public axis: Axis;
        public lineStyle: {
            [style: string]: string;
        };
        public render(parent: ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel {
    class AxisLabeler implements Renderer {
        public area: Rectangle;
        public axis: Axis;
        public style: {
            [style: string]: any;
        };
        public render(parent: ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel {
    class ChronoChart {
        public area: Rectangle;
        public time: Range;
        public copyFrom(chart: ChronoChart): ChronoChart;
        public getTimeY(time: Range): Range;
    }
}
declare module Haeckel {
    var EMPTY_CHARACTER_MATRIX: CharacterMatrix<Set>;
}
declare module Haeckel.chr {
    function initiate<S extends Set>(domain: S): Character<S>;
}
declare module Haeckel.chr {
    function normalizeWeights<S extends Set>(statesList: WeightedStates<S>[]): WeightedStates<S>[];
}
declare module Haeckel.rng {
    function combine(ranges: Range[]): Range;
}
declare module Haeckel.rng {
    function overlap(a: Range, b: Range): boolean;
}
declare module Haeckel.rng {
    function distance(a: Range, b: Range): Range;
}
declare module Haeckel.rng {
    function multiply(r: Range, factor: number): Range;
}
declare module Haeckel.rng {
    function read(data: number): Range;
    function read(data: number[]): Range;
}
declare module Haeckel.rng {
    function write(r: Range): any;
}
declare module Haeckel.chr {
    function createRange(domain: Range, inferrable?: boolean, distance?: boolean): Character<Range>;
}
declare module Haeckel {
    var TIME_CHARACTER: Character<Range>;
}
declare module Haeckel.rng {
    function sum(ranges: Range[]): Range;
}
declare module Haeckel.chr {
    function toDistanceMatrix(matrix: CharacterMatrix<Set>, anchors?: Taxic): DistanceMatrix<Taxic>;
}
declare module Haeckel.rec {
    function createFromCoords(x1: number, y1: number, x2: number, y2: number): Rectangle;
}
declare module Haeckel.rng {
    function add(r: Range, value: number): Range;
}
declare module Haeckel.rng {
    function constrain(original: Range, constraint: Range): Range;
}
declare module Haeckel {
    class ChronoCharChart extends ChronoChart {
        public characterMatrix: CharacterMatrix<Set>;
        public horizontalRatioMap: (taxon: Taxic) => Range;
        public copyFrom(chart: ChronoChart): ChronoCharChart;
        public getTaxonRect(taxon: Taxic): Rectangle;
        public getTaxonX(taxon: Taxic): Range;
        public useCharacterMatrixForHorizontal(leftTaxon: Taxic, rightTaxon: Taxic): ChronoCharChart;
    }
}
declare module Haeckel {
    var ORIGIN: Point;
}
declare module Haeckel.pt {
    function create(x: number, y: number): Point;
}
declare module Haeckel {
    interface GeoCoords extends Model {
        lat: number;
        lon: number;
    }
    function isGeoCoords(o: GeoCoords): boolean;
}
declare module Haeckel {
    function DEFAULT_PROJECTOR(coords: GeoCoords): Point;
}
declare module Haeckel.geo {
    function project(regions: ExtSet<GeoCoords[]>, projector: (coords: GeoCoords) => Point): Point[][];
}
declare module Haeckel.pt {
    function contains(shape: Point[], p: Point): boolean;
}
declare module Haeckel.pt {
    function rectangle(shape: Point[]): Rectangle;
}
declare module Haeckel.pt {
    function area(shape: Point[]): number;
}
declare module Haeckel.pt {
    function weight(shape: Point[], area?: number): number;
}
declare module Haeckel.pt {
    function weights(shapes: Point[][], areas?: number[]): number[];
}
declare module Haeckel.rec {
    function random(r: Rectangle, random?: () => number): Point;
}
declare module Haeckel.pt {
    function random(shapes: Point[][], weights?: number[], random?: () => number): Point;
    function random(a: Point, b: Point, random?: () => number): Point;
}
declare module Haeckel {
    interface Occurrence extends Model {
        count: Range;
        geo: ExtSet<GeoCoords[]>;
        time: Range;
    }
    function isOccurrence(o: any): boolean;
}
declare module Haeckel {
    class GeoChart implements Renderer {
        public area: Rectangle;
        public color: Color;
        public minThickness: number;
        public occurrences: ExtSet<Occurrence>;
        public projector: (coords: GeoCoords) => Point;
        public random: () => number;
        public project(coords: GeoCoords): Point;
        public render(parent: ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel {
    var EMPTY_DAG_SOLVER: DAGSolver<any>;
}
declare module Haeckel {
    var EMPTY_NOMENCLATURE: Nomenclature;
}
declare module Haeckel.ext {
    function domain<T>(hash: string): ExtSet<T>;
}
declare module Haeckel.chr {
    function createDomain<T>(hash: string, readStates?: (data: any) => ExtSet<T>, writeStates?: (states: ExtSet<T>) => any): Character<ExtSet<T>>;
}
declare module Haeckel.geo {
    function createCoords(lat: number, lon: number): GeoCoords;
}
declare module Haeckel.geo {
    function readCoords(data: number[]): GeoCoords;
}
declare module Haeckel.geo {
    function readRegion(data: number[][]): GeoCoords[];
}
declare module Haeckel {
    interface GeoData {
        [regionName: string]: number[][];
    }
}
declare module Haeckel.geo {
    function readRegions(data: GeoData): ExtSet<GeoCoords[]>;
    function readRegions(data: number[][][]): ExtSet<GeoCoords[]>;
}
declare module Haeckel {
    var GEO_CHARACTER: Character<ExtSet<GeoCoords[]>>;
}
declare module Haeckel {
    var DEG_TO_RAD: number;
}
declare module Haeckel {
    interface Point3D extends Point {
        z: number;
    }
    function isPoint3D(o: Point3D): boolean;
}
declare module Haeckel.geo {
    function toPoint3D(coords: GeoCoords, radius?: number): Point3D;
}
declare module Haeckel.geo {
    function center(regions: ExtSet<GeoCoords[]>): GeoCoords;
    function center(region: GeoCoords[]): GeoCoords;
}
declare module Haeckel.nom {
    function forTaxon(nomenclature: Nomenclature, taxon: Taxic): ExtSet<string>;
}
declare module Haeckel {
    class GeoPhyloChart implements Renderer {
        public color: Color;
        public extensions: boolean;
        public lineAttrs: (source: Taxic, target: Taxic, solver: DAGSolver<Taxic>) => {
            [name: string]: string;
        };
        public mapArea: Rectangle;
        public nomenclature: Nomenclature;
        public occurrenceMatrix: CharacterMatrix<Set>;
        public paddingY: number;
        public projector: (coords: GeoCoords) => Point;
        public rootRadius: number;
        public solver: DAGSolver<Taxic>;
        public project(coords: GeoCoords): Point;
        public render(parent: ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel {
    var COUNT_CHARACTER: Character<Range>;
}
declare module Haeckel.occ {
    function create(count?: Range, geo?: ExtSet<GeoCoords[]>, time?: Range): Occurrence;
}
declare module Haeckel {
    interface OccurrenceData {
        count?: any;
        geo?: GeoData;
        time?: any;
    }
}
declare module Haeckel.occ {
    function read(data: OccurrenceData): Occurrence;
}
declare module Haeckel.occ {
    function readOccurrences(data: OccurrenceData[]): ExtSet<Occurrence>;
    function readOccurrences(data: {
        [key: string]: OccurrenceData;
    }): ExtSet<Occurrence>;
}
declare module Haeckel {
    var OCCURRENCE_CHARACTER: Character<ExtSet<Occurrence>>;
}
declare module Haeckel.rec {
    function contains(r: Rectangle, p: Point): boolean;
}
declare module Haeckel.rec {
    function overlap(a: Rectangle, b: Rectangle): boolean;
}
declare module Haeckel.rec {
    function intersect(a: Rectangle, b: Rectangle): Rectangle;
}
declare module Haeckel {
    class OccurrencePlotChart extends ChronoCharChart implements Renderer {
        public radius: number;
        public random: () => number;
        private createPoint(builder, p, unit, withinMinimum);
        private drawPoints(builder, plots, area, unit, count);
        private drawRect(builder, plots, area, unit);
        private getIndividualPoint(plots, area);
        public render(parent: ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel.ext {
    function includes<T>(a: ExtSet<T>, b: ExtSet<T>): boolean;
}
declare module Haeckel.tax {
    function includes(a: Taxic, b: Taxic): boolean;
}
declare module Haeckel.tax {
    function intersect(a: Taxic, b: Taxic): Taxic;
}
declare module Haeckel {
    class PhyloSolver {
        private _cache;
        private _dagSolver;
        private _graph;
        private _taxonBuilder;
        public dagSolver : DAGSolver<Taxic>;
        public graph : Digraph<Taxic>;
        public universal : Taxic;
        constructor(graph: Digraph<Taxic>);
        constructor(builder: DAGBuilder<Taxic>);
        constructor(solver: DAGSolver<Taxic>);
        public branch(internal: Taxic, external: Taxic): Taxic;
        public clade(taxon: Taxic): Taxic;
        public cladogen(taxon: Taxic): Taxic;
        public crown(specifiers: Taxic, extant: Taxic): Taxic;
        public distance(x: Taxic, y: Taxic): number;
        public isCladogen(taxon: Taxic): boolean;
        public max(taxon: Taxic): Taxic;
        public min(taxon: Taxic): Taxic;
        public prcIntersect(taxon: Taxic): Taxic;
        public prcUnion(taxon: Taxic): Taxic;
        public subgraph(taxon: Taxic): Digraph<Taxic>;
        public subgraphSolver(taxon: Taxic): PhyloSolver;
        public sucIntersect(taxon: Taxic): Taxic;
        public sucUnion(taxon: Taxic): Taxic;
        public synPrc(apomorphic: Taxic, representative: Taxic): Taxic;
        public total(specifiers: Taxic, extant: Taxic): Taxic;
    }
}
declare module Haeckel {
    class PhyloChart extends ChronoCharChart implements Renderer {
        public phyloSolver: PhyloSolver;
        public vertexRenderer: (builder: ElementBuilder, taxon: Taxic, rectangle: Rectangle) => void;
        public render(parent: ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel {
    var EMPTY_DISTANCE_MATRIX: DistanceMatrix<any>;
}
declare module Haeckel {
    var WHITE: Color;
}
declare module Haeckel {
    function precisionEqual(a: number, b: number): boolean;
}
declare module Haeckel.dst {
    function max<T>(matrix: DistanceMatrix<T>): number;
}
declare module Haeckel.tax {
    function distance(matrix: DistanceMatrix<Taxic>, focus: Taxic, taxon: Taxic): Range;
}
declare module Haeckel {
    interface ProximityBar {
        distance: Range;
        names: ExtSet<string>;
        normalizedDistance: Range;
        taxon: Taxic;
    }
    class ProximityBarChart implements Renderer {
        private id;
        public area: Rectangle;
        public barSort: (a: ProximityBar, b: ProximityBar) => number;
        public colorMap: (taxon: Taxic) => Color;
        public distanceMatrix: DistanceMatrix<any>;
        public focus: Taxic;
        public labeler: (bar: ProximityBar, rectangle: Rectangle, builder: ElementBuilder) => void;
        public nomenclature: Nomenclature;
        public spacing: number;
        public taxa: ExtSet<Taxic>;
        constructor(id: string);
        private getBars();
        private renderBar(builder, defs, bar, index, barWidth);
        public render(parent: ElementBuilder, defs: () => ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel {
    var TAU: number;
}
declare module Haeckel.pt {
    function add(a: Point, b: Point): Point;
}
declare module Haeckel.pt {
    function distance(a: Point, b: Point): number;
}
declare module Haeckel.pt {
    function furthest(source: Point, points: Point[]): Point;
}
declare module Haeckel.pt {
    function nearest(source: Point, points: Point[]): Point;
}
declare module Haeckel.trg {
    function normalize(radians: number): number;
}
declare module Haeckel.ray {
    function create(origin: Point, angle: number): Ray;
}
declare module Haeckel.pt {
    function angle(a: Point, b: Point): number;
}
declare module Haeckel.ray {
    function contains(ray: Ray, p: Point): boolean;
}
declare module Haeckel.ray {
    function intersectSegment(ray: Ray, segment: Point[]): Point[];
}
declare module Haeckel.ray {
    function intersectSegments(ray: Ray, segments: Point[][]): Point[];
}
declare module Haeckel.rec {
    function combine(rectangles: Rectangle[]): Rectangle;
}
declare module Haeckel.rec {
    function segments(rects: Rectangle[]): Point[][];
}
declare module Haeckel {
    interface Vector extends Model {
        angle: number;
        distance: number;
    }
    function isVector(o: any): boolean;
}
declare module Haeckel.vec {
    function create(radians: number, distance: number): Vector;
}
declare module Haeckel.vec {
    function point(v: Vector): Point;
}
declare module Haeckel {
    interface Region {
        taxon: Taxic;
        typeRect: Rectangle;
        rectangles: Rectangle[];
    }
    interface RegionTaxon {
        taxon: Taxic;
        type?: Taxic;
    }
    interface RegionLabel {
        angle: number;
        attrs: {
            [attrName: string]: string;
        };
        label: string;
    }
    class RegionChart extends ChronoCharChart implements Renderer {
        public labels: (taxon: Taxic) => RegionLabel;
        public margin: number;
        public minPointDistance: number;
        public pointsPerRegion: number;
        public smoothing: number;
        public shapeAttrFunction: (taxon?: Taxic) => {
            [attr: string]: string;
        };
        public shapeAttrs: {
            [attr: string]: string;
        };
        public taxa: RegionTaxon[];
        private addMargins(rect);
        private getRegions();
        public render(parent: ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel.rng {
    function compare(a: Range, b: Range): number;
}
declare module Haeckel {
    interface Stratum extends Model {
        type: string;
        name: string;
        start: Range;
        end: Range;
    }
    function isStratum(o: any): boolean;
}
declare module Haeckel {
    class StratChart extends ChronoChart implements Renderer {
        public minStrokeWidth: number;
        public strata: ExtSet<Stratum>;
        public type: string;
        public render(parent: ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel {
    class StratLabeler implements Renderer {
        public chart: StratChart;
        public fontSize: number;
        public margin: number;
        public render(parent: ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel {
    var VECTOR_0: Vector;
}
declare module Haeckel {
    class VectorChronoLabeler implements Renderer {
        public chart: ChronoCharChart;
        public nameVectorMap: (name: string) => Vector;
        public names: ExtSet<string>;
        public nomenclature: Nomenclature;
        public sizeMap: (area: number) => number;
        public render(parent: ElementBuilder): ElementBuilder;
    }
}
declare module Haeckel {
    var BIT_MEMBER_MAX: number;
}
declare module Haeckel {
    var EMPTY_MAP: (value: any) => any;
}
declare module Haeckel {
    var EMPTY_PHYLO_SOLVER: PhyloSolver;
}
declare module Haeckel {
    var RAD_TO_DEG: number;
}
declare module Haeckel {
    var XLINK_NS: string;
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
    function contains(s: BitSet, n: number): boolean;
}
declare module Haeckel.bit {
    function createFromBits(bits: number): BitSet;
}
declare module Haeckel.bit {
    function create(members: number[]): BitSet;
}
declare module Haeckel.bit {
    function intersect(a: BitSet, b: BitSet): BitSet;
}
declare module Haeckel.bit {
    function size(s: BitSet): number;
}
declare module Haeckel.bit {
    function distance(a: BitSet, b: BitSet): Range;
}
declare module Haeckel.bit {
    function each(s: BitSet, f: (value: number) => any, thisObject?: any): void;
}
declare module Haeckel.bit {
    function forAll(s: BitSet, f: (value: number) => boolean, thisObject?: any): boolean;
}
declare module Haeckel.bit {
    function forSome(s: BitSet, f: (value: number) => boolean, thisObject?: any): boolean;
}
declare module Haeckel.bit {
    function includes(superset: BitSet, subset: BitSet): boolean;
}
declare module Haeckel.bit {
    function prIncludes(superset: BitSet, subset: BitSet): boolean;
}
declare module Haeckel.bit {
    function read(data: number): BitSet;
    function read(data: number[]): BitSet;
}
declare module Haeckel.bit {
    function setDiff(minuend: BitSet, subtrahend: BitSet): BitSet;
}
declare module Haeckel.bit {
    function union(sets: BitSet[]): BitSet;
}
declare module Haeckel.bit {
    function write(set: BitSet): any;
}
declare module Haeckel {
    function combiner<S extends Set>(union: (sets: S[]) => S): (sets: S[]) => S;
}
declare module Haeckel.chr {
    function createBit(domain: BitSet, inferrable?: boolean, distance?: boolean): Character<BitSet>;
}
declare module Haeckel.ext {
    function distance<T>(a: ExtSet<T>, b: ExtSet<T>): Range;
}
declare module Haeckel.ext {
    function read<T>(data: any): ExtSet<T>;
}
declare module Haeckel.chr {
    function createExt<T>(domain: ExtSet<T>, inferrable?: boolean, distance?: boolean): Character<ExtSet<T>>;
}
declare module Haeckel.ist {
    function create<T>(criterion: (element: T) => boolean): IntSet<T>;
}
declare module Haeckel.chr {
    function createInt<T>(criterion: (element: T) => boolean, combine?: (sets: IntSet<T>[]) => IntSet<T>, readStates?: (data: any) => IntSet<T>, writeStates?: (states: IntSet<T>) => any): Character<IntSet<T>>;
}
declare module Haeckel.clr {
    function create(r: number, g: number, b: number): Color;
}
declare module Haeckel {
    interface Dating extends Model {
        taxa: ExtSet<Taxic>;
        time: Range;
    }
    function isDating(o: Dating): boolean;
}
declare module Haeckel.dat {
    function toCharacterMatrixBuilder(datings: ExtSet<Dating>, phyloSolver: PhyloSolver): CharacterMatrixBuilder<Range>;
}
declare module Haeckel {
    interface DistanceAxis {
        distance: Range;
        endpoints: ExtSet<number>;
    }
}
declare module Haeckel.dst {
    function axes<T>(matrix: DistanceMatrix<T>): DistanceAxis[];
}
declare module Haeckel {
    interface DistanceItem<T> {
        distance: Range;
        item: T;
    }
}
declare module Haeckel.dst {
    function list<T>(matrix: DistanceMatrix<T>, focus: T): DistanceItem<T>[];
}
declare module Haeckel.dst {
    function mapAround<T>(matrix: DistanceMatrix<T>, focus: T): (element: T) => Range;
}
declare module Haeckel.dst {
    function normalize<T>(matrix: DistanceMatrix<T>): DistanceMatrix<T>;
}
declare module Haeckel.ext {
    function forAll<T>(set: ExtSet<T>, f: (element: T) => boolean, thisObject?: any): boolean;
}
declare module Haeckel.ext {
    function forSome<T>(set: ExtSet<T>, f: (element: T) => boolean, thisObject?: any): boolean;
}
declare module Haeckel.ext {
    function map<X, Y>(set: ExtSet<X>, f: (element: X) => Y, thisObject?: any): ExtSet<Y>;
}
declare module Haeckel.ext {
    function prIncludes<T>(a: ExtSet<T>, b: ExtSet<T>): boolean;
}
declare module Haeckel.ext {
    function where<T>(set: ExtSet<T>, f: (element: T) => boolean, thisObject?: any): ExtSet<T>;
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
            [name: string]: CharacterMatrix<Set>;
        };
        datings: {
            [name: string]: ExtSet<Dating>;
        };
        distanceMatrices: {
            [name: string]: DistanceMatrix<Taxic>;
        };
        metadata: DataSourceMetadata;
        nomenclature: Nomenclature;
        occurrences: CharacterMatrix<Set>;
        phylogenies: {
            [name: string]: Digraph<Taxic>;
        };
        strata: ExtSet<Stratum>;
    }
}
declare module Haeckel {
    interface DataSources {
        nomenclature: Nomenclature;
        sources: {
            [filename: string]: DataSource;
        };
    }
}
declare module Haeckel {
    interface PNGAssets {
        image(builder: ElementBuilder, filename: string): ElementBuilder;
    }
    interface Figure {
        assets?: {
            png?: string[];
            svg?: string[];
        };
        height: number;
        sources?: string[];
        width: number;
        render(builder: ElementBuilder, sources: DataSources, defs: () => ElementBuilder, pngAssets: PNGAssets): void;
    }
}
declare module Haeckel {
    interface FileCache {
        base64: {
            [filename: string]: string;
        };
        text: {
            [filename: string]: string;
        };
    }
}
declare module Haeckel.nom {
    function read(data: any, builder?: NomenclatureBuilder): NomenclatureBuilder;
}
declare module Haeckel.tax {
    function byName(nomenclature: Nomenclature, name: string): Taxic;
}
declare module Haeckel {
    interface CharacterMapData {
        [name: string]: {
            [characterKey: string]: any;
        };
    }
    class CharacterMapReader<S extends Set> {
        public characterMap: (key: string) => Character<S>;
        public nomenclature: Nomenclature;
        constructor();
        public readCharacterMatrix(data: CharacterMapData, builder?: CharacterMatrixBuilder<S>): CharacterMatrixBuilder<S>;
        public readNomenclature(data: any, builder?: NomenclatureBuilder): NomenclatureBuilder;
    }
}
declare module Haeckel {
    class TempNomenclature {
        public nomenclature: Nomenclature;
        public warn: boolean;
        private _otherNameMap;
        constructor(nomenclature?: Nomenclature);
        public taxon(name: string): Taxic;
    }
}
declare module Haeckel {
    interface CharacterScoresData {
        characterType?: string;
        scores: {
            [name: string]: any[];
        };
    }
    class CharacterScoresReader {
        public nomenclature: Nomenclature;
        public readCharacterMatrix(data: CharacterScoresData, builder?: CharacterMatrixBuilder<Set>): CharacterMatrixBuilder<Set>;
        public readNomenclature(data: CharacterScoresData, builder?: NomenclatureBuilder): NomenclatureBuilder;
    }
}
declare module Haeckel {
    interface DatingData {
        taxa: string[];
        time: number[];
    }
    class DatingReader {
        public nomenclature: Nomenclature;
        public readDatings(data: DatingData[], builder?: ExtSetBuilder<Dating>): ExtSetBuilder<Dating>;
        public readNomenclature(data: DatingData[], builder?: NomenclatureBuilder): NomenclatureBuilder;
    }
}
declare module Haeckel {
    interface DistanceData {
        distance: any;
        names: string[];
    }
    class DistanceMatrixReader {
        public nomenclature: Nomenclature;
        public readDistanceMatrix(data: DistanceData[], builder?: DistanceMatrixBuilder<Taxic>): DistanceMatrixBuilder<Taxic>;
        public readNomenclature(data: DistanceData[], builder?: NomenclatureBuilder): NomenclatureBuilder;
    }
}
declare module Haeckel {
    interface NomenclatureRelationsData {
        hyponymies?: string[][];
        synonymies?: string[][];
    }
    class NomenclatureRelationsReader {
        public readNomenclature(data: NomenclatureRelationsData, builder?: NomenclatureBuilder): NomenclatureBuilder;
    }
}
declare module Haeckel {
    interface OccurrencesData {
        [name: string]: OccurrenceData;
    }
    class OccurrencesReader {
        public nomenclature: Nomenclature;
        public readCharacterMatrix(data: OccurrencesData, builder?: CharacterMatrixBuilder<Set>): CharacterMatrixBuilder<Set>;
        public readNomenclature(data: OccurrencesData, builder?: NomenclatureBuilder): NomenclatureBuilder;
    }
}
declare module Haeckel {
    class PhyloArcsReader {
        public nomenclature: Nomenclature;
        public readDAG(data: string[][], builder?: DAGBuilder<Taxic>): DAGBuilder<Taxic>;
        public readNomenclature(data: string[][], builder?: NomenclatureBuilder): NomenclatureBuilder;
    }
}
declare module Haeckel {
    interface StratData {
        boundaries: {
            [id: string]: any;
        };
        units: {
            [name: string]: StratUnitData;
        };
    }
    interface StratUnitData {
        boundaries: string[];
        type: string;
    }
    class StratReader {
        private _boundaries;
        public readStrata(data: StratData, builder?: ExtSetBuilder<Stratum>): ExtSetBuilder<Stratum>;
    }
}
declare module Haeckel {
    class TopologyReader {
        public nomenclature: Nomenclature;
        public readDAG(data: string, builder?: DAGBuilder<Taxic>): DAGBuilder<Taxic>;
        public readDAG(data: any[], builder?: DAGBuilder<Taxic>): DAGBuilder<Taxic>;
        public readNomenclature(data: string, builder?: NomenclatureBuilder): NomenclatureBuilder;
        public readNomenclature(data: any[], builder?: NomenclatureBuilder): NomenclatureBuilder;
    }
}
declare module Haeckel {
    interface SourceData {
        characterMaps?: {
            [name: string]: CharacterMapData;
        };
        characterScores?: {
            [name: string]: CharacterScoresData;
        };
        datings?: {
            [name: string]: DatingData[];
        };
        distances?: {
            [name: string]: DistanceData[];
        };
        nomenclature?: NomenclatureRelationsData;
        occurrences?: OccurrencesData;
        phyloGraphs?: {
            [name: string]: string[][];
        };
        stratigraphy?: StratData;
        topologies?: {
            [name: string]: any;
        };
    }
    interface DataSourceData {
        data: SourceData;
        metadata: DataSourceMetadata;
    }
    class DataSourceReader {
        private _nomenclature;
        private characterMapReader;
        private characterScoresReader;
        private datingReader;
        private distanceMatrixReader;
        private nomenclatureRelationsReader;
        private occurrencesReader;
        private phyloArcsReader;
        private stratReader;
        private topologyReader;
        public nomenclature : Nomenclature;
        public readDataSource(data: DataSourceData): DataSource;
        public readNomenclature(data: DataSourceData, builder?: NomenclatureBuilder): NomenclatureBuilder;
    }
}
declare module Haeckel {
    class DataSourcesReader {
        public read(files: FileCache, filenames: string[]): DataSources;
    }
}
declare module Haeckel.fig {
    function render(figure: Figure, document: Document, files: FileCache, serializer: XMLSerializer): string;
}
declare module Haeckel.ist {
    function contains<T>(set: IntSet<T>, element: T): boolean;
}
declare module Haeckel.ist {
    function intersect<T>(a: IntSet<T>, b: IntSet<T>): IntSet<T>;
}
declare module Haeckel.ist {
    function setDiff<T>(minuend: IntSet<T>, subtrahend: IntSet<T>): IntSet<T>;
}
declare module Haeckel.ist {
    function union<T>(sets: IntSet<T>[]): IntSet<T>;
}
declare module Haeckel.nom {
    function forSubtaxa(nomenclature: Nomenclature, taxon: Taxic): ExtSet<string>;
}
declare module Haeckel.rng {
    function intersect(a: Range, b: Range): Range;
}
declare module Haeckel.occ {
    function timeSlice(time: Range, occurrences: ExtSet<Occurrence>): ExtSet<Occurrence>;
}
declare module Haeckel.phy {
    function coarsen(solver: DAGSolver<Taxic>, taxa: ExtSet<Taxic>): DAGBuilder<Taxic>;
}
declare module Haeckel.phy {
    function merge(solvers: ExtSet<PhyloSolver>, taxa: ExtSet<Taxic>): PhyloSolver;
}
declare module Haeckel.phy {
    function refine(solver: DAGSolver<Taxic>): DAGBuilder<Taxic>;
}
declare module Haeckel.pt {
    function create3D(x: number, y: number, z: number): Point3D;
}
declare module Haeckel.pt {
    function equal(a: Point, b: Point): boolean;
}
declare module Haeckel.rec {
    interface BBoxElement extends SVGElement {
        getBBox(): SVGRect;
    }
    function createFromBBox(svg: BBoxElement): Rectangle;
}
declare module Haeckel.rec {
    function createFromPoints(a: Point, b: Point): Rectangle;
}
declare module Haeckel.rng {
    function contains(r: Range, n: number): boolean;
}
declare module Haeckel.rng {
    function includes(superset: Range, subset: Range): boolean;
}
declare module Haeckel.rng {
    function prIncludes(superset: Range, subset: Range): boolean;
}
declare module Haeckel.tax {
    function prIncludes(a: Taxic, b: Taxic): boolean;
}
declare module Haeckel.typ {
    function contains<T>(set: TypeSet<T>, element: T): boolean;
}
declare module Haeckel.typ {
    function create<T>(typeObject: any): TypeSet<T>;
}
declare module Haeckel {
    class CharacterScoresWriter {
        public nomenclature: Nomenclature;
        private getName(taxon);
        public write(matrix: CharacterMatrix<Set>): CharacterScoresData;
    }
}
declare module Haeckel {
    class DistanceMatrixWriter {
        public nomenclature: Nomenclature;
        private getName(taxon);
        public write(matrix: DistanceMatrix<Taxic>): DistanceData[];
    }
}
