/**
  @constant
  @type {object}
  default orbs from https://astro-charts.com/blog/2018/how-customize-orbs-your-charts/
*/
export const ASPECTS: object;
export namespace BODIES {
    namespace sun {
        const label: string;
    }
    namespace moon {
        const label_1: string;
        export { label_1 as label };
    }
    namespace mercury {
        const label_2: string;
        export { label_2 as label };
    }
    namespace venus {
        const label_3: string;
        export { label_3 as label };
    }
    namespace mars {
        const label_4: string;
        export { label_4 as label };
    }
    namespace jupiter {
        const label_5: string;
        export { label_5 as label };
    }
    namespace saturn {
        const label_6: string;
        export { label_6 as label };
    }
    namespace uranus {
        const label_7: string;
        export { label_7 as label };
    }
    namespace neptune {
        const label_8: string;
        export { label_8 as label };
    }
    namespace pluto {
        const label_9: string;
        export { label_9 as label };
    }
    namespace chiron {
        const label_10: string;
        export { label_10 as label };
    }
    namespace sirius {
        const label_11: string;
        export { label_11 as label };
    }
}
export namespace POINTS {
    namespace northnode {
        const label_12: string;
        export { label_12 as label };
    }
    namespace southnode {
        const label_13: string;
        export { label_13 as label };
    }
    namespace lilith {
        const label_14: string;
        export { label_14 as label };
    }
}
export namespace ANGLES {
    namespace ascendant {
        const label_15: string;
        export { label_15 as label };
    }
    namespace midheaven {
        const label_16: string;
        export { label_16 as label };
    }
}
export const HOUSES: {
    '1': {
        label: string;
    };
};
export const SIGNS: ({
    key: string;
    startDate: {
        tropical: any;
        sidereal: any;
        astronomical: any;
    };
    endDate: {
        tropical: any;
        sidereal: any;
        astronomical: any;
    };
    zodiacStart: number;
    zodiacEnd: number;
} | {
    key: string;
    startDate: {
        astronomical: any;
        tropical?: undefined;
        sidereal?: undefined;
    };
    endDate: {
        astronomical: any;
        tropical?: undefined;
        sidereal?: undefined;
    };
    zodiacStart: number;
    zodiacEnd: number;
})[];
