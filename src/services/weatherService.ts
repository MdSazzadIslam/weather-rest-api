import { Weather, IWeather } from "../schemas/weatherModel";
import axios from "axios";
import { config } from "dotenv";
config();

class WeatherService {
  /**
   *
   * @param dt
   * @param limit
   * @param page
   * @returns
   */
  public getWeathers = async (
    dt: any,
    limit: number,
    page: number
  ): Promise<Array<IWeather>> => {
    const promises: any = [
      await Weather.find({ dt })
        .sort({ userId: "asc" })
        .limit(limit)
        .skip(limit * page - limit)
        .exec(),
      Weather.countDocuments().exec(),
    ];

    return await Promise.all(promises);
  };

  /**
   *
   * @param dt
   * @param city
   * @returns
   */
  public getWeather = async (dt: any, city: any): Promise<IWeather> => {
    return await Weather.findOne({
      city: { $regex: city, $options: "i" },
      dt,
    }).exec();
  };

  /**
   *
   * @param city
   * @param start
   * @param end
   * @returns
   */
  public getAvgTemp = async (
    city: string,
    start: string,
    end: string
  ): Promise<Array<IWeather>> => {
    return await Weather.aggregate([
      {
        $match: {
          $and: [{ city }, { dt: { $gte: start, $lt: end } }],
        },
      },
      {
        $group: {
          _id: "$city",
          avgTemp: { $avg: "$forecast.temp" },
        },
      },
    ]);
  };

  /**
   *
   * @param payload
   * @returns
   */
  public createWeather = async (payload: any): Promise<IWeather> => {
    return Weather.create(payload);
  };

  public getDataFromOpenWeatherAPI = async (city: any): Promise<any> => {
    const base_url: string =
      process.env.WEATHER_API +
      `?q=${city}` +
      "&units=metric&appid=" +
      `${process.env.APP_ID}`;

    const res = await axios.get(base_url);
    const { data } = res;
    return data;
  };
}

export { WeatherService };
