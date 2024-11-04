import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Analysis, Website} from "@/lib/types";

export interface Websites {
  [key: number]: Website
}

export interface WebsitesState {
  websites: Websites ; // Use an object instead of Map
}

const initialState: WebsitesState = {
  websites: {},
};

const websitesSlice = createSlice({
  name: 'websites',
  initialState,
  reducers: {
    // use to sync websites list when enter the page or login
    syncUserWebsites(state, action: PayloadAction<Website[]>) {
      const websitesArray = action.payload;

      websitesArray.forEach((website) => {
        // Create a new Website object with analyses as an object
        const existingWebsite = state.websites[website.index];
        const websiteWithObject: Website = {
          ...website,
          website_preview:  website.website_preview || existingWebsite?.website_preview,
          analyses: existingWebsite?.analyses ?? {}, // Initialize analyses as an object
        };
        // Add or replace the website in the object
        state.websites[websiteWithObject.index] = websiteWithObject;
      });
    },
    // use to sync website with its problems and analyses when user enter specific website page
    syncWebsiteWithAnalysis(state, action: PayloadAction<Website>) {
      const website = action.payload;
      
      const websiteWithObject: Website = {
        ...website,
        analyses: website.analyses ?? {}, // Initialize analyses as an object
      };
      // Add or replace the website in the object
      state.websites[websiteWithObject.index] = websiteWithObject;
    },
    // use to sync analysis when user in specific website to browse analysis
    syncAnalyses(state, action: PayloadAction<{ websiteIndex: number; analyses: Analysis[] }>) {
      const { websiteIndex, analyses } = action.payload;

      const website = state.websites[websiteIndex];
      if (website) {
        // Add or update the analysis in the object
        analyses.forEach(analysis => {
          website.analyses[analysis.index] = analysis; // Use object to handle duplicates
        });
      }
    },
  },
});

// Selector to get websites
export const selectWebsites = (state: { websites: WebsitesState }): Websites => {
  return state.websites.websites
}

// Selector to get analyses for a specific website index, sorted by ctime descending
export const selectWebsiteByWebsiteIndex = (state :{ websites: WebsitesState}, websiteIndex: number) => {
  return state.websites.websites[websiteIndex]
}

export const { syncUserWebsites, syncWebsiteWithAnalysis, syncAnalyses } = websitesSlice.actions;
export default websitesSlice.reducer;