export interface GameParams {
    id: string;
    title: string;
    bannerUrl: string;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            // Ps.: undefined => this route doesn't need any parameters
            home: undefined;
            game: GameParams;
        }
    }
}