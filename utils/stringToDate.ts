import { months } from "@/constants/months";

export function returnDate(string: string) {
  return `${string.split("/")[0]} ${
    months[
      Number(
        string.split("/")[1].startsWith("0")
          ? string.split("/")[1].substring(1)
          : string.split("/")[1]
      ) - 1
    ]
  } ${string.split("/")[2]}`;
}
