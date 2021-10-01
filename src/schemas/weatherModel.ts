import { Document, Model, model, Schema } from "mongoose";

export interface IWind {
  speed: number;
  deg: number;
}
export interface IForecast {
  type: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
  pressure: number;
  humidity: number;
  seaLevel: number;
  grndLevel: number;
  sunrise: number;
  sunset: number;
  wind: IWind;
}

export interface ICoord {
  lon: number;
  lat: number;
}

export interface IWeather extends Document {
  id?: string;
  forecast: IForecast;
  coord: ICoord;
  cit: string;
  country: string;
  dt: Date;
}

const WeatherSchema: Schema = new Schema(
  {
    forecast: {
      type: { type: String },
      temp: { type: Number },
      minTemp: { type: Number },
      maxTemp: { type: Number },
      pressure: { type: Number },
      humidity: { type: Number },
      sunrise: { type: Number },
      sunset: { type: Number },

      wind: {
        speed: Number,
        deg: Number,
      },
    },

    coord: {
      lon: { type: Number },
      lat: { type: Number },
    },

    city: { type: String },
    country: { type: String },
    dt: {
      type: String,
    },
  },

  { timestamps: true }
);

export const Weather: Model<IWeather> = model("Weather", WeatherSchema);
