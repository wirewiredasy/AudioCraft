import {
  users,
  audioProcessingHistory,
  userPreferences,
  userCredits,
  type User,
  type UpsertUser,
  type AudioProcessingHistory,
  type InsertAudioProcessingHistory,
  type UserPreferences,
  type InsertUserPreferences,
  type UserCredits,
  type InsertUserCredits,
} from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Audio processing history
  saveProcessingHistory(history: InsertAudioProcessingHistory): Promise<AudioProcessingHistory>;
  getUserProcessingHistory(userId: string): Promise<AudioProcessingHistory[]>;
  
  // User preferences
  getUserPreferences(userId: string): Promise<UserPreferences | undefined>;
  updateUserPreferences(userId: string, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences>;
  
  // User credits/subscription
  getUserCredits(userId: string): Promise<UserCredits | undefined>;
  updateUserCredits(userId: string, credits: Partial<InsertUserCredits>): Promise<UserCredits>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Audio processing history
  async saveProcessingHistory(history: InsertAudioProcessingHistory): Promise<AudioProcessingHistory> {
    const [result] = await db
      .insert(audioProcessingHistory)
      .values(history)
      .returning();
    return result;
  }

  async getUserProcessingHistory(userId: string): Promise<AudioProcessingHistory[]> {
    return await db
      .select()
      .from(audioProcessingHistory)
      .where(eq(audioProcessingHistory.userId, userId))
      .orderBy(audioProcessingHistory.createdAt);
  }

  // User preferences
  async getUserPreferences(userId: string): Promise<UserPreferences | undefined> {
    const [preferences] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId));
    return preferences;
  }

  async updateUserPreferences(userId: string, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences> {
    const [result] = await db
      .insert(userPreferences)
      .values({ userId, ...preferences })
      .onConflictDoUpdate({
        target: userPreferences.userId,
        set: {
          ...preferences,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  // User credits/subscription
  async getUserCredits(userId: string): Promise<UserCredits | undefined> {
    const [credits] = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, userId));
    return credits;
  }

  async updateUserCredits(userId: string, creditsUpdate: Partial<InsertUserCredits>): Promise<UserCredits> {
    const [result] = await db
      .insert(userCredits)
      .values({ userId, ...creditsUpdate })
      .onConflictDoUpdate({
        target: userCredits.userId,
        set: {
          ...creditsUpdate,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }
}

// Create storage instance
export const storage = new DatabaseStorage();